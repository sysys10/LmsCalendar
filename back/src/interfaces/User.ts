interface User {
  user_id: string;
  nickname: string;
  login_id?: string;
  password?: string;
  profile_image: string;
  thumbnail_image: string;
  provider: "local" | "kakao";
  kakao_id?: string;
  kakao_refresh_token?: string;
  refresh_token?: string;
}

interface KakaoUserInfo {
  id: string;
  properties: {
    nickname: string;
    profile_image?: string;
  };
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
  kakao_refresh_token?: string;
}

interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export { User, KakaoUserInfo, Tokens, LoginResponse };
