import { action } from 'typesafe-actions';
import ActionTypes from './constants';

import { IEntriesList } from './types';

export const getEntryList = data => action(ActionTypes.GET_ENTRY_LIST, data);
export const getEntryListSuccess = (data: IEntriesList) => action(ActionTypes.GET_ENTRY_LIST_SUCCESS, data);
export const getEntryListFailed = (error: any) => action(ActionTypes.GET_ENTRY_LIST_FAILED, error);

export const postEntryFeedback = (id: string, status: string) =>
  action(ActionTypes.POST_ENTRY_FEEDBACK, { id, status });
export const postEntryFeedbackSuccess = (exitModal: boolean) =>
  action(ActionTypes.POST_ENTRY_FEEDBACK_SUCCESS, exitModal);
export const postEntryFeedbackFailed = (error: any) => action(ActionTypes.POST_ENTRY_FEEDBACK_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
