import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_ENDPOINT as string,
  process.env.REACT_APP_API_KEY as string
);

console.log(process.env.NODE_ENV);

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (!event.body)
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "no data" }),
    };
  const odieData = JSON.parse(event.body as string);
  let { data, error } = await supabase
    .from(process.env.REACT_APP_TABLE as string)
    .insert([odieData]);
  console.log(data, error);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
