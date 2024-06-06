import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  openLogin: false,
  adminPrincipal: null,
  tokenUser: null,
  roleUser: "",
  userConsent: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.adminPrincipal = action.payload.admin;
    },
    openLogin(state) {
      state.openLogin = true;
    },
    closeLogin(state) {
      state.openLogin = false;
    },
    logout(state) {
      state.token = initialState.token;
      state.adminPrincipal = initialState.adminPrincipal;
    },
    setAdminPrincipal(state, action) {
      state.adminPrincipal = action.payload;
    },
    removeAdminPrincipal(state) {
      state.adminPrincipal = null;
    },
    setTokenUser(state, action) {
      state.tokenUser = action.payload;
    },
    setRoleUser(state, action) {
      state.roleUser = action.payload;
    },
    setUserConsent(state, action) {
      state.userConsent = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
