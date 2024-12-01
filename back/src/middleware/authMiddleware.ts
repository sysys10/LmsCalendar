import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/jwtUtils";
import RequestWithUser from "../interfaces/ResponseWithUser";

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "액세스 토큰이 헤더에 없습니다." });
  }
  try {
    const { user_id, provider } = verifyAccessToken(token);
    req.user_id = user_id;
    req.provider = provider;
    next();
  } catch (error) {
    res.status(401).send({ message: "엑세스토큰 인증 실패" });
  }
};
