import { createSelector } from 'reselect';
import { RootState } from 'store/store';

import { initialState } from './slice';

const selectApp = (state: RootState) => state.enquiryManagement || initialState;

const makeSelectEnquiriesLoading = () => createSelector(selectApp, substate => substate.loading);
const makeSelectEnquiriesData = () => createSelector(selectApp, substate => substate.enquiries);

export { makeSelectEnquiriesLoading, makeSelectEnquiriesData };
