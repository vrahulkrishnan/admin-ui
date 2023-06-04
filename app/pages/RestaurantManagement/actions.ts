import { ServerFileType } from 'types';
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { RestaurantFormTypes } from './types';

export const getRestaurantList = (search?: string) => action(ActionTypes.GET_RESTAURANT_LIST, search);
export const getRestaurantListSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_LIST_SUCCESS, data);
export const getRestaurantListFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_LIST_FAILED, error);

export const addRestaurant = (data: RestaurantFormTypes) => action(ActionTypes.ADD_RESTAURANT, data);
export const addRestaurantSuccess = (data: any) => action(ActionTypes.ADD_RESTAURANT_SUCCESS, data);
export const addRestaurantFailed = (error: any) => action(ActionTypes.ADD_RESTAURANT_FAILED, error);

export const updateRestaurant = (data: RestaurantFormTypes, deletedImages: ServerFileType[]) =>
  action(ActionTypes.UPDATE_RESTAURANT, { ...data, deletedImages });
export const updateRestaurantSuccess = (data: any) => action(ActionTypes.UPDATE_RESTAURANT_SUCCESS, data);
export const updateRestaurantFailed = (error: any) => action(ActionTypes.UPDATE_RESTAURANT_FAILED, error);

export const deleteRestaurant = (id: number) => action(ActionTypes.DELETE_RESTAURANT, id);
export const deleteRestaurantSuccess = (data: any) => action(ActionTypes.DELETE_RESTAURANT_SUCCESS, data);
export const deleteRestaurantFailed = (error: any) => action(ActionTypes.DELETE_RESTAURANT_FAILED, error);

export const getRestaurant = (id: string) => action(ActionTypes.GET_RESTAURANT, id);
export const getRestaurantSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_SUCCESS, data);
export const getRestaurantFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_FAILED, error);

export const getAllLocations = () => action(ActionTypes.GET_ALL_LOCATIONS);
export const getAllLocationsSuccess = (data: any) => action(ActionTypes.GET_ALL_LOCATIONS_SUCCESS, data);
export const getAllLocationsFailed = (error: any) => action(ActionTypes.GET_ALL_LOCATIONS_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
