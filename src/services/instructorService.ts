import instructorRepository from "../repositories/instructorRepository.js";

export default async function findMany(disciplineId: number) {
  return instructorRepository.findMany(disciplineId);
}
