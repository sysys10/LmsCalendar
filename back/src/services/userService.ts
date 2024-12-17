import { v4 as uuidv4 } from "uuid";
import { LoginResponse, User as UserType } from "../interfaces/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils";
import bcrypt from "bcrypt";
import User from "../models/user";
import {
  findKakaoRefreshWithUser,
  findUserWithLoginId,
} from "../utils/kakaoauth";
// 먼저 타입 정의
interface SignUpResult {
  user_id: string;
  provider: "local" | "kakao";
}

// 회원가입 함수들 수정
async function createLocalUser(
  login_id: string,
  password: string,
  nickname: string
): Promise<SignUpResult> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      user_id: uuidv4(),
      login_id,
      nickname,
      password: hashedPassword,
      provider: "local",
    });

    return {
      user_id: newUser.user_id,
      provider: newUser.provider,
    };
  } catch (error) {
    throw error;
  }
}

async function signInUser(
  login_id: string,
  password: string
): Promise<LoginResponse> {
  try {
    const user = await findUserWithLoginId(login_id);

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password!);
    if (!isValidPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // refresh token 업데이트
    user.refresh_token = refreshToken;
    await user.save();

    return {
      user: {
        user_id: user.user_id,
        nickname: user.nickname,
        profile_image: user.profile_image,
        thumbnail_image: user.thumbnail_image,
        provider: user.provider,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
}

const findRefreshTokenWithUserId = async (user_id: string) => {
  try {
    const user: UserType | null = await findKakaoRefreshWithUser(user_id);
    return user?.kakao_refresh_token;
  } catch (error) {
    throw error;
  }
};

export { createLocalUser, signInUser, findRefreshTokenWithUserId };
