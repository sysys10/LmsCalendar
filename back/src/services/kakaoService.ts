import { LoginResponse } from "../interfaces/User";
import {
  createKakaoUser,
  createLoginResponse,
  findUserWithKakaoId,
  saveUserToken,
  updateKakaoUser,
} from "../utils/kakaoauth";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils";
import dotenv from "dotenv";
dotenv.config();

async function handleKakaoAuth(
  kakaoId: string,
  nickname: string,
  profile_image: string,
  thumbnail_image: string,
  kakaoRefreshToken: string
): Promise<LoginResponse> {
  try {
    let user = await findUserWithKakaoId(kakaoId);
    if (!user) {
      user = await createKakaoUser(
        kakaoId,
        nickname,
        profile_image,
        thumbnail_image,
        kakaoRefreshToken
      );
    } else {
      user = await updateKakaoUser(
        user,
        nickname,
        profile_image,
        thumbnail_image,
        kakaoRefreshToken
      );
    }

    const accessToken = generateAccessToken(user!);
    const refreshToken = generateRefreshToken(user!);
    await saveUserToken(user, refreshToken);

    return createLoginResponse(user, accessToken, refreshToken);
  } catch (error) {
    throw error;
  }
}

export { handleKakaoAuth };
