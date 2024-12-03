import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        localStorage.removeItem("user-data");
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
