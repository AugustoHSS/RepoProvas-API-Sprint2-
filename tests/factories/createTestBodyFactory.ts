import { faker } from "@faker-js/faker";

export default function userBodyFactory(categoryId: number) {
  return {
    name: faker.name.jobTitle(),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId,
    disciplineId: 1,
    teacherId: 1,
    views: 0
  };
}