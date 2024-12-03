import express from "express";
import userRouter from "./user";
import roomRouter from "./room";
import productRouter from "./product";
import kakaoRouter from "./kakao";
const router = express.Router();

router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/product", productRouter);
router.use("/kakao", kakaoRouter);
export default router;
