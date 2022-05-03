import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

async function createTest(req: Request, res: Response) {
  const data = req.body
  await testService.createTest(data)
  res.sendStatus(201)
}

async function addView(req: Request, res: Response) {
  const { testId } = req.params
  await testService.addView(testId)
  res.sendStatus(200)
}


export default {
  find,
  createTest,
  addView,
};
