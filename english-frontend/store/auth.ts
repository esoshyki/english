import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  error: string;
  status: "idle" | "pending" | "error" | "success";
  showLoginModal: boolean;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: "",
    showLoginModal: false,
  } as AuthState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
    },
    setLogingStatus(state, { payload }: PayloadAction<AuthState["status"]>) {
      state.status = payload;
    },
    setLogingError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    setShowLoginModal(state, { payload }: PayloadAction<boolean>) {
      state.showLoginModal = payload;
    },
    resetApi(state) {
      state.error = "";
      state.status = "idle";
    },
  },
});

export const {
  setToken,
  setLogingStatus,
  setLogingError,
  resetApi,
  setShowLoginModal,
} = authSlice.actions;

export default authSlice.reducer;
