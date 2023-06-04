import { call, put } from '@redux-saga/core/effects';
import { isObject, has } from 'lodash';

import * as AppActions from 'pages/AppManagement/actions';
import { IStatusMessage } from 'pages/AppManagement/types';
import { redirectToLogin } from './routing';
import { history } from './history';

const checkForKeyExistence = (obj: { [key: string]: string }, key: string) => {
  return isObject(obj) && has(obj, key);
};

const handleUnauthorized = (errorCode: number) => {
  if (errorCode === 401 || errorCode === 440) {
    const pathname = history.location.pathname;

    if (!pathname.includes('login')) {
      localStorage.clear();
      redirectToLogin();
    }
  }
};

export function* apiRequestHelper(apifn: any, ...args: any[]) {
  try {
    const response = yield call(apifn, ...args);
    return response;
  } catch (err: any) {
    if (checkForKeyExistence(err, 'error') && isObject(err.error)) {
      if (err.error.code === 401 || err.error.code === 440) {
        yield handleUnauthorized(err.error.code);
        throw { ...err, message: err.error.message || 'Session expired' };
      }
      throw err.error;
    } else if (checkForKeyExistence(err, 'statusCode')) {
      if (err.statusCode === 401) {
        yield handleUnauthorized(err.statusCode);
        throw { ...err, message: 'Session expired' };
      }
      throw { ...err, message: err.message };
    } else if (checkForKeyExistence(err, 'status')) {
      yield handleUnauthorized(err.status);
      throw { ...err, message: err.statusText };
    } else {
      throw { message: 'Unexpected error' };
    }
  }
}

export function* statusHandlerSaga(data: IStatusMessage) {
  try {
    yield put(AppActions.showStatusMessage(data));
  } catch (e) {
    yield put(AppActions.closeStatusMessage());
  }
}

export function* errorHandlerSaga(
  error: any,
  failedAction?: (error: any) => { type: any; payload: any },
  shouldShowToaster = true
) {
  if (shouldShowToaster) {
    yield call(statusHandlerSaga, { type: 'danger', message: error.message });
  }
  if (failedAction) {
    yield put(failedAction(error.message));
  }
}
