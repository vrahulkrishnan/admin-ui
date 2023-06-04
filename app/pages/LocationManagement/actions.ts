import { ServerFileType } from 'types';
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { LocationFormTypes } from './types';

export const getLocationList = (search?: string) => action(ActionTypes.GET_LOCATION_LIST, search);
export const getLocationListSuccess = (data: any) => action(ActionTypes.GET_LOCATION_LIST_SUCCESS, data);
export const getLocationListFailed = (error: any) => action(ActionTypes.GET_LOCATION_LIST_FAILED, error);

export const addLocation = (data: LocationFormTypes) => action(ActionTypes.ADD_LOCATION, data);
export const addLocationSuccess = (data: any) => action(ActionTypes.ADD_LOCATION_SUCCESS, data);
export const addLocationFailed = (error: any) => action(ActionTypes.ADD_LOCATION_FAILED, error);

export const updateLocation = (data: LocationFormTypes, deletedImages: ServerFileType[]) =>
  action(ActionTypes.UPDATE_LOCATION, { ...data, deletedImages });
export const updateLocationSuccess = (data: any) => action(ActionTypes.UPDATE_LOCATION_SUCCESS, data);
export const updateLocationFailed = (error: any) => action(ActionTypes.UPDATE_LOCATION_FAILED, error);

export const deleteLocation = (id: number) => action(ActionTypes.DELETE_LOCATION, id);
export const deleteLocationSuccess = (data: any) => action(ActionTypes.DELETE_LOCATION_SUCCESS, data);
export const deleteLocationFailed = (error: any) => action(ActionTypes.DELETE_LOCATION_FAILED, error);

export const getLocation = (id: string) => action(ActionTypes.GET_LOCATION, id);
export const getLocationSuccess = (data: any) => action(ActionTypes.GET_LOCATION_SUCCESS, data);
export const getLocationFailed = (error: any) => action(ActionTypes.GET_LOCATION_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
