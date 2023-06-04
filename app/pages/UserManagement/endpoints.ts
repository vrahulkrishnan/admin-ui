import request, { ResponseError } from 'utils/request';

export function getUserList({ page = 1, search, limit = 10 }): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'user',
    params: { page, limit, ...(search && { search }) }
  });
}

export function getUser(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'user-details',
    params: { userId: id }
  });
}

export function getActivityByUser(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'activity/participated/user',
    params: { userId: id }
  });
}
