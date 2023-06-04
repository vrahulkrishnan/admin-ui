import request, { ResponseError } from 'utils/request';

export function getDasboardData(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'dashboard'
  });
}
