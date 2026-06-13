import { create } from "zustand";

export const useAppStore = create((set) => ({
  isBootstrapped: false,
  isZaloMiniApp: false,
  zaloProfile: null,
  zaloAccessToken: null,
  bootstrapError: null,
  setBootstrapState: (payload) =>
    set((state) => ({
      ...state,
      ...payload,
      isBootstrapped: true,
    })),
  setZaloSession: ({ profile = null, accessToken = null }) =>
    set({
      isZaloMiniApp: true,
      zaloProfile: profile,
      zaloAccessToken: accessToken,
    }),
  clearBootstrapError: () => set({ bootstrapError: null }),
}));
