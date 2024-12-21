import { Request } from "express";

interface RequestWithUser extends Request {
  user_id?: string;
  provider?: string;
}

export default RequestWithUser;
