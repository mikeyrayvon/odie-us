import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  let { data, error } = await supabase
    .from("random_users")
    .select("subdomain")
    .limit(1)
    .single();
  console.log(data, error);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
