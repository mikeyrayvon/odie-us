import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export const SUBDOMAIN_REGEXP = /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/;

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  console.log(process.env.REACT_APP_TABLE);
  if (!request.body) response.status(200).json({ error: "no data" });

  if (
    !request.body.url.includes("https://docs.google.com/document/d/") ||
    !SUBDOMAIN_REGEXP.exec(request.body.subdomain)
  ) {
    response.status(200).json({ error: "invalid subdomain" });
  }

  let { data, error } = await supabase
    .from(process.env.REACT_APP_TABLE as string)
    .insert([request.body]);

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.status(200).send(data);
};

export default handler;
