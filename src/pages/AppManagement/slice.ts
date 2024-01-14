import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppManagementState } from './types';

export const initialState: AppManagementState = {
  currentLocale: 'en',
  mode: 'light',
  loading: false,
  error: '',
  userData: {},
  showStatus: false,
  status: { message: '', type: 'success' }
};

const localeSlice = createSlice({
  name: 'appManagement',
  initialState,
  reducers: {
    setCurrentLocale: (state: AppManagementState, action: PayloadAction<string>) => {
      state.currentLocale = action.payload;
    },
    setThemeMode: (state: AppManagementState, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
    fetchUser: state => {
      state.loading = true;
      state.error = '';
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showStatusMessage: (state, action) => {
      state.showStatus = true;
      state.status = action.payload;
    },
    closeStatusMessage: state => {
      state.showStatus = false;
      state.status = { message: '', type: 'success' };
    }
  }
});

export const {
  setCurrentLocale,
  setThemeMode,
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
  showStatusMessage,
  closeStatusMessage
} = localeSlice.actions;

export default localeSlice.reducer;
