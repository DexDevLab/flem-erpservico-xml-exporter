import nextConnect from "next-connect";
import { apiAllowCors } from "./apiAllowCors";
const apiHandler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(405).json({
      statusCode: 405,
      error: "Method Not Allowed",
    });
  },
}).use(apiAllowCors);

export { apiHandler };
