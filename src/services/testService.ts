import testRepository from "../repositories/testRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}
async function createTest(data: any) {
  const teacherDisciplineId = await testRepository.getTeacherDisciplineId(data.disciplineId, data.teacherId)
  if (!teacherDisciplineId) {
    throw notFoundError("Relation not found for teacher discipline!");
  }
  console.log(teacherDisciplineId)
  await testRepository.createTest(data, teacherDisciplineId.id)
}

export default {
  find,
  createTest,
};
