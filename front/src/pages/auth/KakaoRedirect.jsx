// components/Auth.js
import { useEffect } from "react";
import { useKakaoLogin } from "../../hooks/useKakaoLogin";

const KakaoRedirect = () => {
  const { authenticateKakao, isAuthenticating } = useKakaoLogin();

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get("code");
    if (authCode) {
      authenticateKakao(authCode);
    }
  }, [authenticateKakao]);

  return <div>{isAuthenticating ? "카카오톡 인증 중..." : "인증 완료"}</div>;
};

export default KakaoRedirect;
