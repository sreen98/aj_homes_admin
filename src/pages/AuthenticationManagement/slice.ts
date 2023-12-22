import { createSlice } from '@reduxjs/toolkit';

import { AuthManagementState } from './types';

export const initialState: AuthManagementState = {
  loading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'authManagement',
  initialState,
  reducers: {
    login: state => {
      state.loading = true;
      state.error = '';
    },
    loginSuccess: state => {
      state.loading = false;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.loading = true;
      state.error = '';
    },
    logoutSuccess: state => {
      state.loading = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { login, loginSuccess, loginFailed, logout, logoutSuccess, logoutFailed } = authSlice.actions;

export default authSlice.reducer;
