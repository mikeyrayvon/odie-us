import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export const SUBDOMAIN_REGEXP = /^[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]$/;

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (!request.body) response.status(200).json({ error: "no query" });

  if (!SUBDOMAIN_REGEXP.exec(request.body.subdomain)) {
    console.error("Invalid subdomain");
    response.status(200).json({ error: "Invalid subdomain" });
    return;
  }

  if (
    !request.body.url.startsWith("https://docs.google.com/document/d/") ||
    !request.body.url.endsWith("/pub")
  ) {
    console.error("Invalid url");
    response.status(200).json({ error: "Invalid url" });
    return;
  }

  let { data, error } = await supabase
    .from(process.env.REACT_APP_TABLE as string)
    .insert([
      {
        ...request.body,
        subdomain: request.body.subdomain.toLowerCase(),
      },
    ]);

  if (error) {
    console.log(error);
    response.status(200).json({
      error:
        error.code === "23505" ? "Subdomain already exists" : error.message,
    });
    return;
  }

  response.status(200).send(data);
  return;
};

export default handler;
