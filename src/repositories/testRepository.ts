import { prisma } from "../database.js";

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function createTest(data: any, teacherDisciplineId: number) {

  await prisma.test.create({
    data: {
      name: data.name,
      pdfUrl: data.pdfUrl,
      categoryId: data.categoryId,
      teacherDisciplineId: teacherDisciplineId,
      views: data.views,
    }
  })
}

async function getTeacherDisciplineId(disciplineId: number, teacherId: number) {
  return prisma.teacherDiscipline.findFirst({
    where: {
      AND: [
        { teacherId: teacherId },
        { disciplineId: disciplineId }
      ]
    }
  })
}

async function addView(testId: number) {

  await prisma.test.update({
    where: {
      id: testId
    },
    data: {
      views: { increment: 1 }
    }

  })
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  createTest,
  getTeacherDisciplineId,
  addView
};
