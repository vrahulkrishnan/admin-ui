import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
/**
 * Get User List
 */
export function* getUserList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getUserList, data.payload);
    yield put(Actions.getUserListSuccess(response.data));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getUserListFailed);
  }
}

/**
 * Get User Details
 */
export function* getUser(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getUser, data.payload);
    yield put(Actions.getUserSuccess(response.data));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getUserFailed);
  }
}

export function* getActivityByUser(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivityByUser, data.payload);
    yield put(Actions.getActivityByUserSuccess(response.data));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getActivityByUserFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callUserSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_USER_LIST, getUserList),
    yield takeLatest(ActionTypes.GET_USER, getUser),
    yield takeLatest(ActionTypes.GET_ACTIVITY_BY_USER, getActivityByUser)
  ]);
}
