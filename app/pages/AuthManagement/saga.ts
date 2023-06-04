import { all, takeLatest, put, call } from 'redux-saga/effects';

import { RequestSagaParams } from 'types';
import { localRedirect } from 'utils';
import { apiRequestHelper, errorHandlerSaga, statusHandlerSaga } from 'utils/saga';

import ActionTypes from './constants';
import * as Actions from './actions';

import * as Endpoints from './endpoints';

export function* loginSaga(data: RequestSagaParams) {
  try {
    const { redirectPath, ...rest } = data.payload;
    const response = yield apiRequestHelper(Endpoints.postLogin, rest);
    yield put(Actions.loginSuccess(response.data));
  } catch (err) {
    const error: any = err;
    yield call(errorHandlerSaga, error, Actions.loginFailed);
  }
}

export function* resetPasswordSaga(data: RequestSagaParams) {
  try {
    const response = yield apiRequestHelper(Endpoints.resetPassword, data.payload);
    yield put(Actions.resetUserPasswordSuccess(response.message));
    yield call(statusHandlerSaga, { message: response.message });
    yield call(localRedirect, '/login');
  } catch (err) {
    const error: any = err;
    yield call(errorHandlerSaga, error, Actions.resetUserPasswordFailed);
  }
}

export function* forgotPasswordSaga(data: RequestSagaParams) {
  try {
    const response = yield apiRequestHelper(Endpoints.forgotPassword, data.payload);
    yield put(Actions.forgotPasswordSuccess(response.message));
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    const error: any = err;
    yield call(errorHandlerSaga, error, Actions.forgotPasswordFailed);
  }
}

export function* verifyPasswordResetLinkSaga(data: RequestSagaParams) {
  try {
    const response = yield apiRequestHelper(Endpoints.verifyResetLink, data.payload);
    yield put(Actions.forgotPasswordLinkVerifySuccess(response.data.userId));
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    const error: any = err;
    yield call(errorHandlerSaga, error, Actions.forgotPasswordLinkVerifyFailed);
    yield call(localRedirect, '/forgot-password');
  }
}

export default function* callLoginWatcherSaga() {
  yield all([
    yield takeLatest(ActionTypes.LOGIN, loginSaga),
    yield takeLatest(ActionTypes.RESET_USER_PASSWORD, resetPasswordSaga),
    yield takeLatest(ActionTypes.FORGOT_LOGIN_PASSWORD, forgotPasswordSaga),
    yield takeLatest(ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY, verifyPasswordResetLinkSaga)
  ]);
}
