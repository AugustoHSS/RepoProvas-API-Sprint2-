import instructorRepository from "../repositories/instructorRepository.js";

async function findMany(disciplineId: number) {
  return instructorRepository.findMany(disciplineId);
}

async function findAll() {
  return instructorRepository.findAll();
}

export default {
  findMany,
  findAll,
};