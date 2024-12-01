import jwt from "jsonwebtoken";
import { User } from "../interfaces/User";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

interface TokenPayload {
  user_id: string;
  provider: "local" | "kakao";
}

export const generateAccessToken = <T extends User>(user: T): string => {
  const payload: TokenPayload = {
    user_id: user.user_id,
    provider: user.provider,
  };
  console.log(ACCESS_TOKEN_SECRET);
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = <T extends User>(user: T): string => {
  const payload: TokenPayload = {
    user_id: user.user_id,
    provider: user.provider,
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};
