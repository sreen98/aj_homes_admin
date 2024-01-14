/**
 * The app state selectors
 */

import { createSelector } from 'reselect';
import { RootState } from 'store/store';

import { initialState } from './slice';

const selectApp = (state: RootState) => state.appManagement || initialState;

const makeSelectCurrentLocale = () => createSelector(selectApp, substate => substate.currentLocale);
const makeShowStatus = () => createSelector(selectApp, substate => substate.showStatus);
const makeStatusHandler = () => createSelector(selectApp, substate => substate.status);
const makeSelectThemeMode = () => createSelector(selectApp, substate => substate.mode);
const makeSelectLoading = () => createSelector(selectApp, substate => substate.loading);
const makeSelectUserData = () => createSelector(selectApp, substate => substate.userData);
const makeSelectError = () => createSelector(selectApp, substate => substate.error);

export {
  makeSelectCurrentLocale,
  makeShowStatus,
  makeStatusHandler,
  makeSelectThemeMode,
  makeSelectLoading,
  makeSelectUserData,
  makeSelectError
};
