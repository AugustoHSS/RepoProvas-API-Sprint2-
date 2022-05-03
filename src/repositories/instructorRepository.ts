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

export default {
  findMany,
};
