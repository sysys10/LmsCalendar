import { create } from "zustand";

const useTokenStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));

export default useTokenStore;
