import request, { ResponseError } from 'utils/request';

import { getMappedProfileImage } from './mappings';
import { IProfile } from './types';

export function getProfileDetails(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'user-details',
    body: {}
  });
}

export function updateProfileDetails(data: IProfile): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'update-user-details',
    body: { ...data }
  });
}

export function updateProfileImage(file: File): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'update-user-image',
    body: getMappedProfileImage(file)
  });
}

export function updatePassword(data: {
  oldPassword: string;
  newPassword: string;
}): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'update-password',
    body: { ...data }
  });
}
