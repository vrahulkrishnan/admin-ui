import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const getDasboardData = () => action(ActionTypes.GET_DASHBOARD_DATA);
export const getDasboardDataSuccess = (data: any) => action(ActionTypes.GET_DASHBOARD_DATA_SUCCESS, data);
export const getDasboardDataFailed = (error: any) => action(ActionTypes.GET_DASHBOARD_DATA_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
