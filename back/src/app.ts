import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import connect from "./config";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cookieParser()); // cookie-parser 미들웨어 추가가 필요

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// 로깅 세팅
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}

//몽고디비 연결
connect();

app.use("/api", router);

// 라우팅 못 거친 애들 404 핸들링
app.use((_, res) => {
  res.status(404).send({
    ok: false,
    message: "요청한 경로 못찾음",
  });
});

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기중");
});
