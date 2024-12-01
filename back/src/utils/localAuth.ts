interface SignUpResult {
  user_id: string;
  provider: "local" | "kakao";
}
import bcrypt from "bcrypt";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { LoginResponse } from "../interfaces/User";

// DB 조회 관련 함수
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// 유저 생성 관련 함수
async function createUser(
  loginId: string,
  hashedPassword: string,
  nickname: string
) {
  return await User.create({
    user_id: uuidv4(),
    login_id: loginId,
    nickname,
    password: hashedPassword,
    provider: "local",
  });
}

// 토큰 저장 함수
async function saveRefreshToken(user: any, refreshToken: string) {
  user.refresh_token = refreshToken;
  return await user.save();
}

// 응답 생성 함수
function createSignUpResponse(user: any): SignUpResult {
  return {
    user_id: user.user_id,
    provider: user.provider,
  };
}

function createLoginResponse(
  user: any,
  accessToken: string,
  refreshToken: string
): LoginResponse {
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
}

async function createLocalUser(
  login_id: string,
  password: string,
  nickname: string
): Promise<SignUpResult> {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(login_id, hashedPassword, nickname);
    return createSignUpResponse(newUser);
  } catch (error) {
    throw error;
  }
}

export {
  createLocalUser,
  createLoginResponse,
  createUser,
  createSignUpResponse,
  saveRefreshToken,
  verifyPassword,
};
