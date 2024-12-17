import express from "express";
import userRouter from "./user";
import calendarRouter from "./calendar";
import productRouter from "./product";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/calendar", authMiddleware, calendarRouter);
export default router;
