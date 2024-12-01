import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "system", // 기본값을 system으로 설정
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme",
    }
  )
);
export default useThemeStore;
