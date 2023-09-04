import type { VercelRequest, VercelResponse } from "@vercel/node";

const handler = (request: VercelRequest, response: VercelResponse) => {
  response.statusCode = 200;
  response.send({ message: "helloWorld" });
};

export default handler;
