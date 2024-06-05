import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  adminPrincipal: null,
  tokenUser: null,
  roleUser: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.adminPrincipal = action.payload.admin;
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
    removeTokenUser(state) {
      state.tokenUser = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
