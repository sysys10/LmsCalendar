import { Request, Response } from "express";
import { createLocalUser, signInUser } from "../services/userService";

//로컬에서 사인업할 떄,
async function signup(req: Request, res: Response) {
  try {
    const { login_id, password, nickname } = req.body;

    // 플랫폼이랑 유저 아이디
    const userInfo = await createLocalUser(login_id, password, nickname);

    res.status(201).json({ ok: true, userInfo });
  } catch (error: any) {
    res.status(400).json({ ok: false, message: error.message });
  }
}

// 에러 처리 예시
async function signin(req: Request, res: Response) {
  try {
    const { login_id, password } = req.body;
    const result = await signInUser(login_id, password);

    res.status(200).json({ ok: true, result });
  } catch (error: any) {
    res.status(401).send({ ok: false, message: error.message });
  }
}

async function refresh(req: Request, res: Response) {
  if (req.headers.authorization && req.cookies.refreshToken) {
    const authToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.cookies.refreshToken;
  }
}

export { signin, signup, refresh };
