import { Request } from "express";

interface RequestWithUser extends Request {
  user_id?: string;
  provider?: "local" | "kakao";
}

export default RequestWithUser;
