import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialAuthState,
      setAuth: ({ user, accessToken, refreshToken = null }) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(accessToken),
        }),
      updateUser: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        })),
      logout: () => set(initialAuthState),
    }),
    {
      name: "sportshub-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const logout = () => useAuthStore.getState().logout();
