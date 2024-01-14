import { all } from 'redux-saga/effects';

import appManagementWatcherSaga from 'pages/AppManagement/saga';
import authManagementWatcherSaga from 'pages/AuthenticationManagement/saga';
import propertyManagementWatcherSaga from 'pages/PropertyManagement/saga';

export function* rootSaga() {
  yield all([appManagementWatcherSaga(), authManagementWatcherSaga(), propertyManagementWatcherSaga()]);
}

export default rootSaga;
