import { all } from 'redux-saga/effects';

import appManagementWatcherSaga from 'pages/AppManagement/saga';
import authManagementWatcherSaga from 'pages/AuthenticationManagement/saga';
import propertyManagementWatcherSaga from 'pages/PropertyManagement/saga';
import enquiryManagementWatcherSaga from 'pages/EnquiryManagement/saga';

export function* rootSaga() {
  yield all([
    appManagementWatcherSaga(),
    authManagementWatcherSaga(),
    propertyManagementWatcherSaga(),
    enquiryManagementWatcherSaga()
  ]);
}

export default rootSaga;
