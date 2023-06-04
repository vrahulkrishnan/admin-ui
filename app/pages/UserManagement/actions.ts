import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const getUserList = data => action(ActionTypes.GET_USER_LIST, data);
export const getUserListSuccess = (data: any) => action(ActionTypes.GET_USER_LIST_SUCCESS, data);
export const getUserListFailed = (error: any) => action(ActionTypes.GET_USER_LIST_FAILED, error);

export const getUser = (id: string) => action(ActionTypes.GET_USER, id);
export const getUserSuccess = (data: any) => action(ActionTypes.GET_USER_SUCCESS, data);
export const getUserFailed = (error: any) => action(ActionTypes.GET_USER_FAILED, error);

export const getActivityByUser = (id: string) => action(ActionTypes.GET_ACTIVITY_BY_USER, id);
export const getActivityByUserSuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_BY_USER_SUCCESS, data);
export const getActivityByUserFailed = (error: any) => action(ActionTypes.GET_ACTIVITY_BY_USER_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
