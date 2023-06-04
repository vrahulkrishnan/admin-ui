import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect } from 'utils';
import { ServerFileType } from 'types';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';
import { ActivityFormTypes } from './types';

/**
 * Get Activity List
 */
export function* getActivityList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivityList, data.payload);
    yield put(Actions.getActivityListSuccess(Mappings.getMappedActivities(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getActivityListFailed);
  }
}
/**
 * Add Activity
 */
export function* addActivity(data: Effect<string, ActivityFormTypes>) {
  try {
    yield apiRequestHelper(Endpoints.addActivity, data.payload);
    yield put(Actions.addActivitySuccess('Successfully added activity'));
    localRedirect('/activities');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.addActivityFailed);
  }
}
/**
 * Update Activity
 */
export function* updateActivity(data: Effect<string, ActivityFormTypes & { deletedImages: ServerFileType[] }>) {
  try {
    yield apiRequestHelper(Endpoints.updateActivity, data.payload);
    yield put(Actions.updateActivitySuccess('Successfully updated activity'));
    localRedirect('/activities');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.updateActivityFailed);
  }
}
/**
 * Delete Activity
 */
export function* deleteActivity(data: Effect<string, string>) {
  try {
    yield apiRequestHelper(Endpoints.deleteActivity, data.payload);
    yield put(Actions.deleteActivitySuccess('Successfully deleted activity'));
    yield put(Actions.getActivityList());
    localRedirect('/activities');
  } catch (err: any) {
    yield call(errorHandlerSaga, { message: err.message }, Actions.deleteActivityFailed);
  }
}
/**
 * Get Activity Details
 */
export function* getActivity(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivity, data.payload);
    yield put(Actions.getActivitySuccess(Mappings.getMappedActivity(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getActivityFailed);
  }
}

/**
 * Get Restaurant List
 */
export function* getRestaurantList() {
  try {
    const response = yield apiRequestHelper(Endpoints.getRestaurantList);
    yield put(Actions.getRestaurantListSuccess(Mappings.getMappedRestaurants(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getRestaurantListFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callActivitySaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_ACTIVITY_LIST, getActivityList),
    yield takeLatest(ActionTypes.ADD_ACTIVITY, addActivity),
    yield takeLatest(ActionTypes.UPDATE_ACTIVITY, updateActivity),
    yield takeLatest(ActionTypes.DELETE_ACTIVITY, deleteActivity),
    yield takeLatest(ActionTypes.GET_ACTIVITY, getActivity),
    yield takeLatest(ActionTypes.GET_RESTAURANT_LIST, getRestaurantList)
  ]);
}
