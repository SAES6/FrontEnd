import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  adminPrincipal: null,
  tokenUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
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
    removeTokenUser(state) {
      state.tokenUser = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
