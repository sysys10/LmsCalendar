import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGOOSE_CONNECTION = process.env.MONGOOSE_CONNECTION;

const connect = () => {
  mongoose.connect(MONGOOSE_CONNECTION!);
};

mongoose.connection.on("error", (err: Error) => {
  console.error("몽고디비 연결 에러", err);
});

export default connect;
