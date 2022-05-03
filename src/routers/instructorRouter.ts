import { Router } from "express";
import instructorController from "../controllers/instructorController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const instructorRouter = Router();

instructorRouter.get(
  "/instructors/:discipline",
  ensureAuthenticatedMiddleware,
  instructorController.findMany
);

export default instructorRouter;