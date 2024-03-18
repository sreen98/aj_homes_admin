import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga, localRedirect, setCookie, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams } from 'types';

export function* loginUser(data: RequestSagaParams) {
  try {
    yield call(setCookie, 'isAdminLoggedIn', 'true');
    yield call(Endpoints.loginUser, data.payload);
    yield call(localRedirect, '/admin/properties');
    yield put(Actions.loginUserSuccess());
    yield call(statusHandlerSaga, { message: 'Successfully Logged In!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.loginUserFailed);
  }
}

export function* logoutUser(): SagaIterator {
  try {
    yield call(setCookie, 'isAdminLoggedIn', 'false');
    yield call(localRedirect, '/admin/login');
    yield put(Actions.loginUserSuccess());
    yield call(statusHandlerSaga, { message: 'Successfully Logged Out!' });
  } catch (error: any) {
    yield put(Actions.loginUserFailed(error));
    yield call(statusHandlerSaga, { message: error.message ?? 'Something went wrong!', type: 'error' });
  }
}

export function* authManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.loginUser.type, loginUser)]);
  yield all([yield takeLatest(Actions.logoutUser.type, logoutUser)]);
}

export default authManagementWatcherSaga;
