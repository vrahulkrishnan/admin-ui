import { ServerFileType } from 'types';
import request, { ResponseError } from 'utils/request';
import * as Mappings from './mappings';
import { RestaurantFormTypes } from './types';

export function getRestaurantList(search?: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'restaurant',
    params: {
      ...(search && { search })
    }
  });
}
export function addRestaurant(data: RestaurantFormTypes): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'restaurant',
    body: Mappings.getMappedRestaurantForm(data)
  });
}
export function updateRestaurant(
  data: RestaurantFormTypes & { deletedImages: ServerFileType[] }
): Promise<{} | { err: ResponseError }> {
  return request.PUT({
    endpoint: `restaurant/${data.id}`,
    body: Mappings.getMappedRestaurantForm(data)
  });
}
export function deleteRestaurant(id: string): Promise<{} | { err: ResponseError }> {
  return request.DELETE({
    endpoint: `restaurant/${id}`
  });
}
export function getRestaurant(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `restaurant/${id}`
  });
}
export function getAllLocations(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'location/all'
  });
}
