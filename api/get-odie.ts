import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  console.log(request.body);
  if (!request.body) response.status(200).send({ body: "error: no data" });

  let { data, error } = await supabase
    .from(process.env.REACT_APP_TABLE as string)
    .select("title, description, url")
    .eq("subdomain", request.body.subdomain);

  if (error) {
    response.status(500).send({ error: error.message });
    return;
  }

  console.log(data);

  if (request.body.env && request.body.env !== "development") {
    await supabase.rpc("increment_views", {
      subdomain: request.body.subdomain,
    });
  }

  response.status(200).send(data);
};

export default handler;
