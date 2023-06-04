import { ServerFileType } from 'types';
import request, { ResponseError } from 'utils/request';
import * as Mappings from './mappings';
import { ActivityFormTypes } from './types';

export function getActivityList(search?: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'activity',
    params: {
      ...(search && { search })
    }
  });
}
export function addActivity(data: ActivityFormTypes): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'activity',
    body: Mappings.getMappedActivityForm(data)
  });
}
export function updateActivity(
  data: ActivityFormTypes & { deletedImages: ServerFileType[] }
): Promise<{} | { err: ResponseError }> {
  return request.PUT({
    endpoint: `activity/${data.id}`,
    body: Mappings.getMappedActivityForm(data)
  });
}
export function deleteActivity(id: string): Promise<{} | { err: ResponseError }> {
  return request.DELETE({
    endpoint: `activity/${id}`
  });
}
export function getActivity(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `activity/${id}`
  });
}
export function getRestaurantList(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'restaurant/all'
  });
}
