import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";


export default async function requiredFactory() {

  const teacherName = faker.name.findName()

  const teacher = await prisma.teacher.upsert({
    where: { name: teacherName },
    update: {},
    create: {
      name: teacherName
    },
  });

  const termNumber = 1

  const term = await prisma.term.upsert({
    where: { number: termNumber },
    update: {},
    create: {
      number: termNumber
    }
  })

  const disciplineName = faker.name.jobTitle()

  const discipline = await prisma.discipline.upsert({
    where: { name: disciplineName },
    update: {},
    create: {
      name: disciplineName,
      termId: term.id
    }
  })

  const teacherDiscipline = await prisma.teacherDiscipline.create({
    data: {
      teacherId: teacher.id,
      disciplineId: discipline.id
    }
  })
  console.log("aquiii!!" + teacher.id)
  const categoryName = `p1`

  const category = await prisma.category.upsert({
    where: { name: categoryName },
    update: {},
    create: {
      name: categoryName
    }
  })

  return {
    categoryId: category.id,
  }


}