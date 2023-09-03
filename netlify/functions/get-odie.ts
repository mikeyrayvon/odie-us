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
  if (!event.body)
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "no data" }),
    };
  const odieData = JSON.parse(event.body as string);
  let { data, error } = await supabase
    .from("users")
    .select("title, description, url")
    .eq("subdomain", odieData.subdomain);

  console.log(odieData.env);
  if (odieData.env && odieData.env !== "development") {
    await supabase.rpc("increment_views", {
      subdomain: odieData.subdomain,
    });
  }
  await supabase.rpc("increment_views", {
    subdomain: odieData.subdomain,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
