import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import createTestSchema from "../schemas/createTestSchema.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.post("/tests/create", ensureAuthenticatedMiddleware, validateSchemaMiddleware(createTestSchema), testController.createTest)
testRouter.patch("/tests/:testId/add-view", testController.addView);

export default testRouter;
