import { ServerFileType } from 'types';
import request, { ResponseError } from 'utils/request';
import * as Mappings from './mappings';
import { LocationFormTypes } from './types';

export function getLocationList(search?: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'location',
    params: {
      ...(search && { search })
    }
  });
}
export function addLocation(data: LocationFormTypes): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'location',
    body: Mappings.getMappedLocationForm(data)
  });
}
export function updateLocation(
  data: LocationFormTypes & { deletedImages: ServerFileType[] }
): Promise<{} | { err: ResponseError }> {
  return request.PUT({
    endpoint: `location/${data.id}`,
    body: Mappings.getMappedLocationForm(data)
  });
}
export function deleteLocation(id: string): Promise<{} | { err: ResponseError }> {
  return request.DELETE({
    endpoint: `location/${id}`
  });
}
export function getLocation(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `location/${id}`
  });
}
