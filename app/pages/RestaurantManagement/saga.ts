import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect } from 'utils';
import { ServerFileType } from 'types';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';
// import * as Data from './data';
import { RestaurantFormTypes } from './types';

/**
 * Get Restaurant List
 */
export function* getRestaurantList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getRestaurantList, data.payload);
    yield put(Actions.getRestaurantListSuccess(Mappings.getMappedRestaurants(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getRestaurantListFailed);
  }
}
/**
 * Add Restaurant
 */
export function* addRestaurant(data: Effect<string, RestaurantFormTypes>) {
  try {
    yield apiRequestHelper(Endpoints.addRestaurant, data.payload);
    yield put(Actions.addRestaurantSuccess('Successfully added restaurant'));
    localRedirect('/restaurants');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.addRestaurantFailed);
  }
}
/**
 * Update Restaurant
 */
export function* updateRestaurant(data: Effect<string, RestaurantFormTypes & { deletedImages: ServerFileType[] }>) {
  try {
    yield apiRequestHelper(Endpoints.updateRestaurant, data.payload);
    yield put(Actions.updateRestaurantSuccess('Successfully updated restaurant'));
    localRedirect('/restaurants');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.updateRestaurantFailed);
  }
}
/**
 * Delete Restaurant
 */
export function* deleteRestaurant(data: Effect<string, string>) {
  try {
    yield apiRequestHelper(Endpoints.deleteRestaurant, data.payload);
    yield put(Actions.deleteRestaurantSuccess('Successfully deleted restaurant'));
    yield put(Actions.getRestaurantList());
    localRedirect('/restaurants');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.deleteRestaurantFailed);
  }
}
/**
 * Get Restaurant Details
 */
export function* getRestaurant(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getRestaurant, data.payload);
    yield put(Actions.getRestaurantSuccess(Mappings.getMappedRestaurant(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getRestaurantFailed);
  }
}

/**
 * Get All Locations
 */
export function* getAllLocations() {
  try {
    const response = yield apiRequestHelper(Endpoints.getAllLocations);
    yield put(Actions.getAllLocationsSuccess(Mappings.getMappedLocations(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getAllLocationsFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callRestaurantSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_RESTAURANT_LIST, getRestaurantList),
    yield takeLatest(ActionTypes.ADD_RESTAURANT, addRestaurant),
    yield takeLatest(ActionTypes.UPDATE_RESTAURANT, updateRestaurant),
    yield takeLatest(ActionTypes.DELETE_RESTAURANT, deleteRestaurant),
    yield takeLatest(ActionTypes.GET_RESTAURANT, getRestaurant),
    yield takeLatest(ActionTypes.GET_ALL_LOCATIONS, getAllLocations)
  ]);
}
