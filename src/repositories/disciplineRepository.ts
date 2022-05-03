import { prisma } from "../database.js";

async function findMany() {
  return prisma.discipline.findMany();
}

async function findDiscipline(disciplineName: string) {
  return prisma.discipline.findUnique({
    where: {
      name: disciplineName,
    },
  });
}
export default {
  findMany,
  findDiscipline,
};
