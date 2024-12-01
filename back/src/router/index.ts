import express from "express";
import userRouter from "./user";
import roomRouter from "./room";
import productRouter from "./product";
const router = express.Router();

router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/product", productRouter);

export default router;
