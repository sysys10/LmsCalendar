import { create } from "zustand";

const useTokenStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));

export default useTokenStore;
