import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga, getEncodedQueryParams, localRedirect, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* getAllProperties(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getAllProperties, data.payload);
    const search = getEncodedQueryParams({ category: data.payload.category });
    yield call(localRedirect, `/admin/properties`, { search });
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
    const mappedFormData = {
      ...data.payload,
      moveInDate: data.payload.moveInDate ? data.payload.moveInDate : ''
    };

    const response: ResponseGenerator = yield call(Endpoints.createProperty, mappedFormData);
    const search = getEncodedQueryParams({ category: 'all' });
    yield call(localRedirect, '/admin/properties', { search });
    yield put(Actions.createPropertySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Added property details successfully!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.createPropertyFailed);
  }
}

export function* uploadImage(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.uploadImage, data.payload.image);
    yield put(Actions.uploadImageSuccess(response?.data));
    if (data.payload.callback) {
      data.payload.callback(response?.data?.imageUrl);
    }
  } catch (error) {
    yield call(errorHandlerSaga, error, Actions.uploadImageFailed);
  }
}

export function* updateProperty(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.updateProperty, data.payload);
    const search = getEncodedQueryParams({ category: 'all' });
    yield call(localRedirect, '/admin/properties', { search });
    yield put(Actions.updatePropertySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Updated property details successfully!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.updatePropertyFailed);
  }
}

export function* updateStatus(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.updateStatus, data.payload);
    yield put(Actions.getAllProperties({ category: data.payload.category }));
    yield put(Actions.updateStatusSuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Updated property status successfully!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.updateStatusFailed);
  }
}
export function* deleteProperty(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.deleteProperty, data.payload);
    const search = getEncodedQueryParams({ category: 'all' });
    yield call(localRedirect, '/admin/properties', { search });
    yield put(Actions.deletePropertySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Deleted property details successfully!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.deletePropertyFailed);
  }
}

export function* propertyManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.getAllProperties.type, getAllProperties)]);
  yield all([yield takeLatest(Actions.uploadImage.type, uploadImage)]);
  yield all([yield takeLatest(Actions.getPropertyDetails.type, getPropertyDetails)]);
  yield all([yield takeLatest(Actions.createProperty.type, createProperty)]);
  yield all([yield takeLatest(Actions.updateProperty.type, updateProperty)]);
  yield all([yield takeLatest(Actions.updateStatus.type, updateStatus)]);
  yield all([yield takeLatest(Actions.deleteProperty.type, deleteProperty)]);
}

export default propertyManagementWatcherSaga;
