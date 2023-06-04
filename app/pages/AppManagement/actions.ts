import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { IStatusMessage } from './types';

export const getData = () => action(ActionTypes.GET_DATA);
export const getDataSuccess = (response: any) => action(ActionTypes.GET_DATA_SUCCESS, response);
export const getDataFailed = (error: object) => action(ActionTypes.GET_DATA_FAILED, error);

export const showStatusMessage = (data: IStatusMessage) => action(ActionTypes.SHOW_STATUS_MESSAGE, data);
export const closeStatusMessage = () => action(ActionTypes.CLOSE_STATUS_MESSAGE);

export const logout = () => action(ActionTypes.LOGOUT);
export const logoutSuccess = () => action(ActionTypes.LOGOUT_SUCCESS);
export const logoutFailed = (error: any) => action(ActionTypes.LOGOUT_FAILED, error);

export const resetRedux = (...args: string[]) => action(ActionTypes.RESET_REDUX, args);
