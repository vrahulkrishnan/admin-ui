import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, statusHandlerSaga } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
/**
 * Get Entry List
 */
export function* getEntryList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getEntriesList, data.payload);
    yield put(Actions.getEntryListSuccess(response.data));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getEntryListFailed);
  }
}

export function* postEntryFeedback(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.postEntryFeedback, data.payload);
    yield put(Actions.postEntryFeedbackSuccess(true));
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.postEntryFeedbackFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callEntrySaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_ENTRY_LIST, getEntryList),
    yield takeLatest(ActionTypes.POST_ENTRY_FEEDBACK, postEntryFeedback)
  ]);
}
