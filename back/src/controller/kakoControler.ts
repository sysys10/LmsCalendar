import dotenv from "dotenv";
import { Request, Response } from "express";
import qs from "qs";
import { call } from "../utils/axiosCall";
import axios from "axios";
import { handleKakaoAuth } from "../services/kakaoService";

dotenv.config();

const client_id = process.env.KAKAO_RESTAPI;
const redirect_uri = process.env.KAKAO_REDIRECTURL;
const client_secret = "";

function kakaoURL(req: Request, res: Response) {
  console.log("/kakao/url start");
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  res.status(200).json({
    url,
  });

  console.log("/kakao/url finish");
}
async function kakaoAuthToken(req: Request, res: Response) {
  const { authCode } = req.body;
  try {
    // 토큰 받기
    const { data: kakaoResponse } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        // qs.stringify 사용
        grant_type: "authorization_code",
        client_id: client_id,
        code: authCode, // 실제로는 code
        redirect_uri: redirect_uri,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    // 유저 정보 받기
    const { data: userInfo } = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${kakaoResponse.access_token}`,
        },
      }
    );

    //여기서 refresh 저장하고, 내 access,refresh 생성하고 한꺼번에 주기.
    console.log(kakaoResponse, userInfo);
    const { nickname, profile_image, thumbnail_image } = userInfo.properties;
    const kakao_id = userInfo.id;

    // if db에 없으면
    const newUser = await handleKakaoAuth(
      kakao_id,
      nickname,
      profile_image,
      thumbnail_image,
      kakaoResponse.refresh_token
    );
    // 리프레시 토큰은 httpOnly 쿠키로 설정
    // 액세스 토큰과 유저 정보 반환
    res
      .cookie("refreshToken", newUser.tokens.refreshToken, {
        httpOnly: true,
        secure: false, // HTTPS에서만 true
        sameSite: "lax", // 'strict', 'lax', 'none' 중 선택
        domain: "localhost", // 프론트엔드 도메인
        path: "/", // 쿠키가 유효한 경로 설정
      })
      .json({
        ok: true,
        user: userInfo.properties,
        access_token: newUser.tokens.accessToken,
      });
  } catch (err) {
    console.error("에러", err);
    res.status(400).json({ ok: false, error: "Authentication failed" });
  }
}
export { kakaoURL, kakaoAuthToken };

/**
 * import { Request, Response } from "express";
import qs from "qs";
import { call } from "../utils/axiosCall";
class KakaoController {
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly redirect_uri: string;

  constructor() {
    this.client_id = process.env.KAKAO_RESTAPI!;
    this.client_secret = process.env.KAKAO_CLIENT_SECRET || "";
    this.redirect_uri = process.env.KAKAO_REDIRECTURL!;
  }

  // 일반 메서드를 화살표 함수로 변경
  public getKakaoUrl = (req: Request, res: Response) => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;
    res.status(200).json({
      url,
    });
  };

  public getKakaoAuth = (req: Request, res: Response) => {
    const { scope } = req.query;

    let scopeParam = "";
    if (scope) scopeParam = "&scope=" + scope;
    res
      .status(302)
      .redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code${scopeParam}`
      );
  };

  public postKakaoAuthToken = async (req: Request, res: Response) => {
    const { authCode } = req.body;
    try {
      const kakaoResponse = await call(
        "post",
        "https://kauth.kakao.com/oauth/token",
        qs.stringify({
          grant_type: "authorization_code",
          client_id: this.client_id,
          code: authCode,
          redirect_uri: this.redirect_uri,
        }),
        { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" }
      );

      console.log(kakaoResponse.data);
      const userInfo = await call(
        "get",
        "https://kapi.kakao.com/v2/user/me",
        "",
        { Authorization: `Bearer ${kakaoResponse.data.access_token}` }
      );

      console.log(userInfo.data);
      res.status(200).json(userInfo.data);
    } catch (error) {
      res.status(500).json({ message: "Error during Kakao auth" });
    }
  };
}

export default new KakaoController();

 */
