import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import { localRedirect, setCookie } from 'utils';

import * as Actions from './slice';

export function* loginUser(): SagaIterator {
  try {
    yield call(setCookie, 'isAdminLoggedIn', 'true');
    yield call(localRedirect, '/properties');
    yield put(Actions.loginSuccess());
  } catch (error) {
    yield put(Actions.loginFailed(error));
  }
}

export function* logoutUser(): SagaIterator {
  try {
    console.log('🚀 ~ file: saga.ts:9 ~ function*loginUser ~ logoutUser: saga');
    yield call(setCookie, 'isAdminLoggedIn', 'false');
    yield call(localRedirect, '/login');
    yield put(Actions.logoutSuccess());
  } catch (error) {
    yield put(Actions.logoutFailed(error));
  }
}

export function* authManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.login.type, loginUser)]);
  yield all([yield takeLatest(Actions.logout.type, logoutUser)]);
}

export default authManagementWatcherSaga;
