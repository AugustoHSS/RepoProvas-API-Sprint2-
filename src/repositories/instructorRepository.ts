import { prisma } from "../database.js";

async function findMany(disciplineId: number) {
  return prisma.teacher.findMany({
    include: {
      teacherDisciplines: {
        include: {
          discipline: true
        },
        where: {
          disciplineId: disciplineId
        }
      }
    }
  });
}

async function findAll() {
  return prisma.teacher.findMany();
}

export default {
  findMany,
  findAll,
};
