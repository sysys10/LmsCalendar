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
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${data.access_token}`;

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
