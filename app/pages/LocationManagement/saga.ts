import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect } from 'utils';
import { ServerFileType } from 'types';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';
import { LocationFormTypes } from './types';

/**
 * Get Location List
 */
export function* getLocationList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getLocationList, data.payload);
    yield put(Actions.getLocationListSuccess(Mappings.getMappedLocations(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getLocationListFailed);
  }
}
/**
 * Add Location
 */
export function* addLocation(data: Effect<string, LocationFormTypes>) {
  try {
    yield apiRequestHelper(Endpoints.addLocation, data.payload);
    yield put(Actions.addLocationSuccess('Successfully added location'));
    localRedirect('/locations');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.addLocationFailed);
  }
}
/**
 * Update Location
 */
export function* updateLocation(data: Effect<string, LocationFormTypes & { deletedImages: ServerFileType[] }>) {
  try {
    yield apiRequestHelper(Endpoints.updateLocation, data.payload);
    yield put(Actions.updateLocationSuccess('Successfully updated location'));
    localRedirect('/locations');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.updateLocationFailed);
  }
}
/**
 * Delete Location
 */
export function* deleteLocation(data: Effect<string, string>) {
  try {
    yield apiRequestHelper(Endpoints.deleteLocation, data.payload);
    yield put(Actions.deleteLocationSuccess('Successfully deleted location'));
    yield put(Actions.getLocationList());
    localRedirect('/locations');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.deleteLocationFailed);
  }
}
/**
 * Get Location Details
 */
export function* getLocation(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getLocation, data.payload);
    yield put(Actions.getLocationSuccess(Mappings.getMappedLocation(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getLocationFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callLocationSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_LOCATION_LIST, getLocationList),
    yield takeLatest(ActionTypes.ADD_LOCATION, addLocation),
    yield takeLatest(ActionTypes.UPDATE_LOCATION, updateLocation),
    yield takeLatest(ActionTypes.DELETE_LOCATION, deleteLocation),
    yield takeLatest(ActionTypes.GET_LOCATION, getLocation)
  ]);
}
