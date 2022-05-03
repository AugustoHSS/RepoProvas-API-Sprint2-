import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";
import createUserFactory from "./factories/createUserFactory.js";
import createTestBodyFactory from "./factories/createTestBodyFactory.js";
import preAddItemsForTestFactory from "./factories/preAddItemsForTestFactory.js";

async function truncateDb() {
  await prisma.$executeRaw`TRUNCATE TABLE 
  users, 
  teachers, 
  terms, 
  disciplines, 
  categories, 
  "TeacherDiscipline", 
  tests;`;
}

async function disconnect() {
  await prisma.$disconnect();
}


describe("login flow tests", () => {
  beforeEach(truncateDb);
  afterAll(disconnect);

  it("returns 201 when user send a valid body", async () => {

    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(201);
  });

  it("return 422 when user send a invalid body", async () => {
    const body = {};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toEqual(422);
  });

  it("return 409 when user send a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/sign-up").send(body);
    const response = await supertest(app).post("/sign-up").send(body);
    const users = await prisma.user.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(409);
  });

  it("return 200 and a token when user send valid body", async () => {
    const body = userBodyFactory();
    await createUserFactory(body);

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(200);
    expect(typeof response.text).toEqual("string");

  });

  it("return 401 when user send invalid email", async () => {
    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  });

  it("return 401 when user send invalid password", async () => {
    const body = userBodyFactory();
    await createUserFactory(body);

    const response = await supertest(app)
      .post("/sign-in")
      .send({
        ...body,
        password: "aaaaaaaaaaa",
      });

    expect(response.status).toEqual(401);
  });
});


describe("flow to /Tests", () => {
  beforeEach(truncateDb);
  afterAll(disconnect);

  it("return 201 when user send a valid inputs", async () => {

    const body = userBodyFactory();
    await createUserFactory(body);

    const token = await supertest(app).post("/sign-in").send(body);
    const { categoryId } = await preAddItemsForTestFactory()

    const test = createTestBodyFactory(categoryId)

    const response = await supertest(app).post("/tests/create").send(test).set('Authorization', `Bearer ${token.body.token}`);


    const tests = await prisma.test.findMany({
      where: {
        name: test.name,
      },
    });
    console.log(response)
    expect(response.status).toEqual(201);
    expect(tests.length).toEqual(1)
  });

  it("return 422 when user send a invalid body", async () => {

    const user = userBodyFactory();
    await createUserFactory(user);

    const token = await supertest(app).post("/sign-in").send(user);
    const body = { name: "test" };

    const response = await supertest(app).post("/tests/create").send(body).set('authorization', `Bearer ${token.body.token}`);


    expect(response.status).toEqual(422);
  });



});