import { action } from 'typesafe-actions';
import ActionTypes from './constants';

import { IProfile } from './types';

export const getProfileDetails = () => action(ActionTypes.GET_PROFILE_DETAILS);
export const getProfileDetailsSuccess = (data: IProfile) => action(ActionTypes.GET_PROFILE_DETAILS_SUCCESS, data);
export const getProfileDetailsFailed = (error: any) => action(ActionTypes.GET_PROFILE_DETAILS_FAILED, error);

export const updateProfileDetails = (data: IProfile) => action(ActionTypes.UPDATE_PROFILE, data);
export const updateProfileDetailsSuccess = (response: any) => action(ActionTypes.UPDATE_PROFILE_SUCCESS, response);
export const updateProfileDetailsFailed = (error: any) => action(ActionTypes.UPDATE_PROFILE_FAILED, error);

export const updateProfileImage = (file: File) => action(ActionTypes.UPDATE_PROFILE_IMAGE, file);
export const updateProfileImageSuccess = (response: any) => action(ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS, response);
export const updateProfileImageFailed = (error: any) => action(ActionTypes.UPDATE_PROFILE_IMAGE_FAILED, error);

export const updatePassword = (data: { oldPassword: string; newPassword: string }) =>
  action(ActionTypes.UPDATE_PASSWORD, data);
export const updatePasswordSuccess = (data: any) => action(ActionTypes.UPDATE_PASSWORD_SUCCESS, data);
export const updatePasswordFailed = (error: any) => action(ActionTypes.UPDATE_PASSWORD_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
