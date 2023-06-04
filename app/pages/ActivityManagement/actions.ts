import { ServerFileType } from 'types';
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { ActivityFormTypes } from './types';

export const getActivityList = (search?: string) => action(ActionTypes.GET_ACTIVITY_LIST, search);
export const getActivityListSuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_LIST_SUCCESS, data);
export const getActivityListFailed = (error: any) => action(ActionTypes.GET_ACTIVITY_LIST_FAILED, error);

export const addActivity = (data: ActivityFormTypes) => action(ActionTypes.ADD_ACTIVITY, data);
export const addActivitySuccess = (data: any) => action(ActionTypes.ADD_ACTIVITY_SUCCESS, data);
export const addActivityFailed = (error: any) => action(ActionTypes.ADD_ACTIVITY_FAILED, error);

export const updateActivity = (data: ActivityFormTypes, deletedImages: ServerFileType[]) =>
  action(ActionTypes.UPDATE_ACTIVITY, { ...data, deletedImages });
export const updateActivitySuccess = (data: any) => action(ActionTypes.UPDATE_ACTIVITY_SUCCESS, data);
export const updateActivityFailed = (error: any) => action(ActionTypes.UPDATE_ACTIVITY_FAILED, error);

export const deleteActivity = (id: number) => action(ActionTypes.DELETE_ACTIVITY, id);
export const deleteActivitySuccess = (data: any) => action(ActionTypes.DELETE_ACTIVITY_SUCCESS, data);
export const deleteActivityFailed = (error: any) => action(ActionTypes.DELETE_ACTIVITY_FAILED, error);

export const getActivity = (id: string) => action(ActionTypes.GET_ACTIVITY, id);
export const getActivitySuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_SUCCESS, data);
export const getActivityFailed = (error: any) => action(ActionTypes.GET_ACTIVITY_FAILED, error);

export const getRestaurantList = () => action(ActionTypes.GET_RESTAURANT_LIST);
export const getRestaurantListSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_LIST_SUCCESS, data);
export const getRestaurantListFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_LIST_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
