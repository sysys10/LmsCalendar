import axiosInstance from "./axiosInstance";

const getKakaoUrl = async () => {
  const { data } = await axiosInstance.get("/user/kakao/url");
  return data;
};

const postKakaoAuthAndUserData = async (authCode) => {
  const { data } = await axiosInstance.post("/user/kakao/oauth/auth", {
    authCode,
  });
  return data;
};

const postKakaoLogout = async () => {
  const { data } = await axiosInstance.post("/user/kakao/logout");
  return data;
};
// const postMyData

export { getKakaoUrl, postKakaoLogout, postKakaoAuthAndUserData };
