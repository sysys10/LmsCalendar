import express, { Request, Response } from "express";
import { signin, signup, refresh } from "../controller/userController";
import { kakaoAuthToken, kakaoURL } from "../controller/kakoControler";

const router = express.Router();

//회원가입
router.post("/signup", signup);

router.get("/kakao/url", kakaoURL);

// router.get("/kakao/oauth", kakaoAuth);
router.post("/kakao/oauth/auth", kakaoAuthToken);

router.post("/kakao/logout", (req: Request, res: Response) => {});

//로그인
router.post("/signin", signin);

//토큰들 리프래쉬
router.post("/refresh", refresh);

export default router;
