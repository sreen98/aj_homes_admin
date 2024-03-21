import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga, localRedirect, setCookie, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams } from 'types';
import { ResponseGenerator } from 'next/dist/server/response-cache';

export function* loginUser(data: RequestSagaParams) {
  try {
    const response: { data: { token: string } } = yield call(Endpoints.loginUser, data.payload);
    console.log('🚀 ~ function*loginUser ~ response:', response);
    yield call(localRedirect, '/admin/properties');
    localStorage.setItem('accessToken', response.data.token);
    // yield call(setCookie, 'Authorization', response.data.token);
    yield put(Actions.loginUserSuccess());
    yield call(statusHandlerSaga, { message: 'Successfully Logged In!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.loginUserFailed);
  }
}

export function* logoutUser(): SagaIterator {
  try {
    // yield call(setCookie, 'isAdminLoggedIn', 'false');
    yield call(localRedirect, '/admin/login');
    localStorage.removeItem('accessToken');
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
