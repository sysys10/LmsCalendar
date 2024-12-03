// hooks/useKakaoLogin.js
import { useMutation } from "@tanstack/react-query";
import {
  getKakaoUrl,
  postKakaoAuthAndUserData,
  postKakaoLogout,
} from "../api/kakaoApi";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import useTokenStore from "../stores/tokenStore";

export const useKakaoLogin = (onLoginSuccess) => {
  const setUser = useUserStore((state) => state.setUser);
  const clearAccessToken = useTokenStore((state) => state.clearAccessToken);
  const navigate = useNavigate();

  const urlMutation = useMutation({
    mutationFn: getKakaoUrl,
    //mutationKey: ["getKakaoUrl"], 왜 쓸까요
    onSuccess: (data) => {
      const scope = "profile_nickname profile_image talk_calendar";
      const url = data.url + "&scope=" + scope;
      // 팝업 대신 현재 창에서 리다이렉트
      window.location.href = url;
    },
  });

  const authMutation = useMutation({
    mutationFn: postKakaoAuthAndUserData,
    onSuccess: (data) => {
      const userData = data.user;
      console.log(data.access_token);

      // 1. 엑세스토큰을 그냥 요청 헤더에 박아놓는 방법.
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${data.access_token}`;

      // 2. 엑세스 토큰 저장소에 저장하기
      // 둘 중에 뭐로 하지?

      setUser(userData);
      onLoginSuccess?.();
      navigate("/");
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
      alert("로그인에 실패했습니다.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: postKakaoLogout,
    onSuccess: () => {
      onLogoutSuccess?.();
      navigate("/");
    },
    onError: (error) => {
      clearUser();
      clearAccessToken();
      console.error("Logout failed:", error);
      alert("로그아웃에 실패했습니다.");
    },
  });

  return {
    getKakaoUrl: urlMutation.mutate,
    isUrlLoading: urlMutation.isLoading,
    authenticateKakao: authMutation.mutate,
    isAuthenticating: authMutation.isLoading,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isLoading,
  };
};
