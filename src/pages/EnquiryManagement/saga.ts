import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* getAllEnquiries(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getAllEnquiries, data.payload);
    yield put(Actions.getAllEnquiriesSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getAllEnquiriesFailed);
  }
}

export function* updateEnquiryStatus(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.updateEnquiryStatus, data.payload);
    yield put(Actions.getAllEnquiries({}));
    yield put(Actions.updateEnquiryStatusSuccess(response.data.data));
    yield call(statusHandlerSaga, {
      message: 'Successfully updated the status!',
      type: 'error'
    });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.updateEnquiryStatusFailed);
  }
}

export function* enquiryManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.getAllEnquiries.type, getAllEnquiries)]);
  yield all([yield takeLatest(Actions.updateEnquiryStatus.type, updateEnquiryStatus)]);
}

export default enquiryManagementWatcherSaga;
