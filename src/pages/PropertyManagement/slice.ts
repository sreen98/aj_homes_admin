import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PropertyManagementState } from './types';
import { ICreatePropertyPayload, IProperty } from 'types';

export const initialState: PropertyManagementState = {
  loading: false,
  properties: [],
  property: {} as IProperty,
  error: ''
};

const propertySlice = createSlice({
  name: 'propertyManagement',
  initialState,
  reducers: {
    getAllProperties: state => {
      state.loading = true;
      state.error = '';
    },
    getAllPropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
      state.loading = false;
      state.properties = action.payload;
    },
    getAllPropertiesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProperty: (state, action: PayloadAction<ICreatePropertyPayload>) => {
      state.loading = true;
      state.error = '';
    },
    createPropertySuccess: state => {
      state.loading = false;
      state.error = '';
    },
    createPropertyFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStatus: (state, action: PayloadAction<{ status: string }>) => {
      state.loading = true;
      state.error = '';
    },
    updateStatusSuccess: state => {
      state.loading = false;
      state.error = '';
    },
    updateStatusFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPropertyDetails: state => {
      state.loading = true;
      state.error = '';
    },
    getPropertyDetailsSuccess: (state, action: PayloadAction<IProperty>) => {
      state.loading = false;
      // state.properties = action.payload;
    },
    getPropertyDetailsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getAllProperties,
  getAllPropertiesSuccess,
  getAllPropertiesFailed,
  getPropertyDetails,
  getPropertyDetailsSuccess,
  getPropertyDetailsFailed,
  createProperty,
  createPropertySuccess,
  createPropertyFailed,
  updateStatus,
  updateStatusSuccess,
  updateStatusFailed
} = propertySlice.actions;

export default propertySlice.reducer;
