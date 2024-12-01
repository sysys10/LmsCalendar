import mongoose from "mongoose";
import { User } from "../interfaces/User";

const UserSchema = new mongoose.Schema<User>(
  {
    // 기본 정보
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    login_id: {
      type: String,
      unique: true,
    },
    nickname: String,
    password: String, // hashed 카카오 로그인은 password 불필요
    profile_image: {
      type: String,
      default:
        "https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
    },
    thumbnail_image: {
      type: String,
      default:
        "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
    },
    // 소셜 로그인 정보
    provider: {
      type: String,
      required: true,
      enum: ["local", "kakao"],
    },
    kakao_id: {
      type: String,
      sparse: true, // kakao로 가입한 유저만 가짐
    },
    kakao_refresh_token: String,
    refresh_token: String,
  },
  {
    timestamps: true,
  }
);
// provider + 카카오 ID로 찾기 쉽게 인덱스 설정
UserSchema.index({ kakao_id: 1, provider: 1 }, { unique: true, sparse: true });

export default UserSchema;
