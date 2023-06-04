import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect, statusHandlerSaga } from 'utils';
import { RequestSagaParams } from 'types';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import { IProfile } from './types';
/**
 * Get User List
 */
export function* getProfileDetails(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getProfileDetails, data.payload);
    yield put(Actions.getProfileDetailsSuccess(response.data));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getProfileDetailsFailed);
  }
}

/**
 * Update profile details
 */
export function* updateProfileDetails(data: Effect<string, IProfile>) {
  try {
    const response = yield apiRequestHelper(Endpoints.updateProfileDetails, data.payload);
    yield put(Actions.updateProfileDetailsSuccess(response.message));
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.updateProfileDetailsFailed);
  }
}

/**
 * Update profile Image
 */
export function* updateProfileImage(data: Effect<string, File>) {
  try {
    const response = yield apiRequestHelper(Endpoints.updateProfileImage, data.payload);
    yield put(Actions.updateProfileDetailsSuccess(response.message));
    yield call(statusHandlerSaga, { message: response.message });
    yield put(Actions.getProfileDetails());
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.updateProfileDetailsFailed);
  }
}

/**
 * Update Password
 */
export function* updatePassword(data: RequestSagaParams) {
  try {
    const response = yield apiRequestHelper(Endpoints.updatePassword, data.payload);
    yield put(Actions.updatePasswordSuccess(response.message));
    localRedirect('/login/');
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.updatePasswordFailed);
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
    yield takeLatest(ActionTypes.GET_PROFILE_DETAILS, getProfileDetails),
    yield takeLatest(ActionTypes.UPDATE_PROFILE, updateProfileDetails),
    yield takeLatest(ActionTypes.UPDATE_PROFILE_IMAGE, updateProfileImage),
    yield takeLatest(ActionTypes.UPDATE_PASSWORD, updatePassword)
  ]);
}
