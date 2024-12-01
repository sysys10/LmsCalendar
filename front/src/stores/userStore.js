// stores/userStore.js 수정
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        // 로컬스토리지에서 직접 삭제
        localStorage.removeItem("user-data");
        // 상태 초기화
        set({ user: null });
      },
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
