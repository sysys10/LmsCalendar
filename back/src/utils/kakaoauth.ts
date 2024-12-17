import { LoginResponse } from "../interfaces/User";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";

async function findUserWithKakaoId(kakao_id: string) {
  return await User.findOne({
    kakao_id: kakao_id,
    provider: "kakao",
  });
}

async function findUserWithLoginId(login_id: string) {
  return await User.findOne({
    login_id: login_id,
    provider: "local",
  });
}

async function findKakaoRefreshWithUser(user_id: string) {
  return await User.findOne({
    login_id: user_id,
    provider: "kakao",
  });
}

// 유저 생성 함수
async function createKakaoUser(
  kakaoId: string,
  nickname: string,
  profile_image: string,
  thumbnail_image: string,
  kakaoRefreshToken: string
) {
  return await User.create({
    user_id: uuidv4(),
    nickname,
    profile_image,
    thumbnail_image,
    provider: "kakao",
    kakao_id: kakaoId,
    kakao_refresh_token: kakaoRefreshToken,
  });
}

// 유저 정보 업데이트 함수
async function updateKakaoUser(
  user: any,
  nickname: string,
  profile_image: string,
  thumbnail_image: string,
  kakaoRefreshToken: string
) {
  user.nickname = nickname;
  user.profile_image = profile_image;
  user.thumbnail_image = thumbnail_image;
  user.kakao_refresh_token = kakaoRefreshToken;
  return await user.save();
}

// 토큰 저장 함수
async function saveUserToken(user: any, refreshToken: string) {
  user.refresh_token = refreshToken;
  return await user.save();
}

// 응답 데이터 생성 함수
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

export {
  findKakaoRefreshWithUser,
  createKakaoUser,
  createLoginResponse,
  findUserWithKakaoId,
  updateKakaoUser,
  findUserWithLoginId,
  saveUserToken,
};
