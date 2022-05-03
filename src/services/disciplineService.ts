import disciplineRepository from "../repositories/disciplineRepository.js";

async function findMany() {
  return disciplineRepository.findMany();
}

async function getDisciplineIdByName(disciplineName: string) {
  const discipline = await disciplineRepository.findDiscipline(disciplineName);
  return discipline.id
}
export default {
  findMany,
  getDisciplineIdByName,
};
