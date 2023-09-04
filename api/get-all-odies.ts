import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  let { data, error } = await supabase
    .from("users")
    .select("title, description, subdomain, views, timestamp")
    .order("timestamp", { ascending: false });

  if (error) {
    response.status(500).send({ error: error.message });
    return;
  }

  response.status(200).send(data);
};

export default handler;
