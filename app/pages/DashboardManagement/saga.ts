import { call, all, takeLatest, put } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import { getMappedDasboardData } from './mappings';
/**
 * Get Entry List
 */
export function* getDasboardData() {
  try {
    const response = yield apiRequestHelper(Endpoints.getDasboardData);
    yield put(Actions.getDasboardDataSuccess(getMappedDasboardData(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, { message: 'Failed to fetch data' }, Actions.getDasboardDataFailed);
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
  yield all([yield takeLatest(ActionTypes.GET_DASHBOARD_DATA, getDasboardData)]);
}
