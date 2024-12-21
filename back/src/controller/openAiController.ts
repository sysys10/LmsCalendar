import { Request, Response } from "express";
import { connectAi } from "../services/openAi";

async function process(req: Request, res: Response) {
  const { text } = req.body;
  const result = await connectAi({ text });
  console.log(result);
  res.json(result);
}

export { process };
