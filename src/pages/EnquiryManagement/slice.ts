import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EnquiryManagementState, IEnquiry } from './types';

export const initialState: EnquiryManagementState = {
  loading: false,
  enquiries: [],
  error: ''
};

const enquirySlice = createSlice({
  name: 'enquiryManagement',
  initialState,
  reducers: {
    getAllEnquiries: (state, action: PayloadAction<{}>) => {
      state.loading = true;
      state.error = '';
    },
    getAllEnquiriesSuccess: (state, action: PayloadAction<IEnquiry[]>) => {
      state.loading = false;
      state.enquiries = action.payload;
    },
    getAllEnquiriesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEnquiryStatus: (state, action: PayloadAction<{ id: string; contacted: boolean }>) => {
      state.loading = true;
      state.error = '';
    },
    updateEnquiryStatusSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = '';
    },
    updateEnquiryStatusFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getAllEnquiries,
  getAllEnquiriesSuccess,
  getAllEnquiriesFailed,
  updateEnquiryStatus,
  updateEnquiryStatusSuccess,
  updateEnquiryStatusFailed
} = enquirySlice.actions;

export default enquirySlice.reducer;
