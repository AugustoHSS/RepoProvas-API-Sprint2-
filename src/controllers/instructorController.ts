import { Request, Response } from "express";
import instructorService from "../services/instructorService.js";
import disciplineService from "../services/disciplineService.js";

async function findMany(req: Request, res: Response) {
  const disciplineName = req.params.discipline
  const disciplineId = await disciplineService.getDisciplineIdByName(disciplineName)
  const instructors = await instructorService.findMany(disciplineId);
  res.send({ instructors });
}


async function findAll(req: Request, res: Response) {
  const instructors = await instructorService.findAll();
  res.send({ instructors });
}

export default {
  findMany,
  findAll,
};