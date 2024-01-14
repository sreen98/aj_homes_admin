import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthManagementState, ILoginPayload } from './types';

export const initialState: AuthManagementState = {
  loading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'authManagement',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<ILoginPayload>) => {
      state.loading = true;
      state.error = '';
    },
    loginUserSuccess: state => {
      state.loading = false;
    },
    loginUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: state => {
      state.loading = true;
      state.error = '';
    },
    logoutUserSuccess: state => {
      state.loading = false;
    },
    logoutUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { loginUser, loginUserSuccess, loginUserFailed, logoutUser, logoutUserSuccess, logoutUserFailed } =
  authSlice.actions;

export default authSlice.reducer;
