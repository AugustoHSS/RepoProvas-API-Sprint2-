import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";
import instructorRouter from "./instructorRouter.js";

const router = Router();

router.use(userRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(disciplineRouter);
router.use(instructorRouter);
export default router;
