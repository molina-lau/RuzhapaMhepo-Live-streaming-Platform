import { User } from "@/types/types";
import { create } from "zustand";
export const useUserState = create<User>(() => ({
  likes: [],
  email: "",
  role: "",
  lastName: "",
  firstName: "",
  podcasts: [],
}));
export const useThemeMode = create<{ mode: boolean; toggleMode: () => void }>(
  (set) => ({
    mode: false,
    toggleMode: () =>
      set((state) => ({
        mode: !state.mode,
      })),
  })
);
