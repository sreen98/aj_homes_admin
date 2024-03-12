import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga, localRedirect, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* getAllProperties(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getAllProperties);
    yield call(localRedirect, '/properties');
    yield put(Actions.getAllPropertiesSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getAllPropertiesFailed);
  }
}

export function* getPropertyDetails(data: RequestSagaParams) {
    try {
    const response: ResponseGenerator = yield call(Endpoints.getPropertyDetails, data.payload);
    yield put(Actions.getPropertyDetailsSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getPropertyDetailsFailed);
  }
}

export function* createProperty(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.createProperty, data.payload);
    yield call(localRedirect, '/properties');
    yield put(Actions.createPropertySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Successfully added property!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.createPropertyFailed);
  }
}

export function* uploadImage(data: RequestSagaParams){
  try {
    const response: ResponseGenerator = yield call(Endpoints.uploadImage, data.payload);
    console.log(response,'responseresponse')
    yield put(Actions.uploadImageSuccess(response.data.data))
  } catch (error) {
    yield call(errorHandlerSaga, error, Actions.uploadImageFailed)
    
  }
}

export function* updateProperty(data: RequestSagaParams) {
  try {
    console.log('in saga',data.payload)
    const response: ResponseGenerator = yield call(Endpoints.updateProperty, data.payload);
    yield call(localRedirect, '/properties');
    yield put(Actions.updatePropertySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Successfully added property!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.updatePropertyFailed);
  }
}

export function* updateStatus(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.updateStatus, data.payload);
    // console.log('🚀 ~ function*createProperty ~ data.payload):', data.payload);
    yield put(Actions.getAllProperties());
    yield put(Actions.updateStatusSuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Successfully updated the status!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.updateStatusFailed);  
  }
}

export function* propertyManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.getAllProperties.type, getAllProperties)]);
  yield all([yield takeLatest(Actions.uploadImage.type, uploadImage)])
  yield all([yield takeLatest(Actions.getPropertyDetails.type, getPropertyDetails)]);
  yield all([yield takeLatest(Actions.createProperty.type, createProperty)]);
  yield all([yield takeLatest(Actions.updateProperty.type, updateProperty)]);
  yield all([yield takeLatest(Actions.updateStatus.type, updateStatus)]);
}

export default propertyManagementWatcherSaga;
