import { NextFunction, Request, RequestHandler, Response } from "express";
import { verifyAccessToken } from "../utils/jwtUtils";
import RequestWithUser from "../interfaces/ResponseWithUser";

interface CustomRequestHandler extends RequestHandler {
  (req: RequestWithUser, res: Response, next: NextFunction): void;
}
export const authMiddleware: CustomRequestHandler = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return;
  }
  try {
    const { user_id } = verifyAccessToken(token);
    req.user_id = user_id;
    next();
  } catch (error) {
    res.status(401).send({ message: "엑세스토큰 인증 실패" });
  }
};
