import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (!request.body) response.status(500).json({ error: "no query" });

  let { data, error } = await supabase
    .from(process.env.REACT_APP_TABLE as string)
    .delete()
    .eq("subdomain", request.body.subdomain);

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.status(200).send(data);
};

export default handler;
