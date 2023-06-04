import request, { ResponseError } from 'utils/request';

export function getData(): Promise<{} | { err: ResponseError }> {
  return request.GET({ endpoint: 'basic-details' });
}

export function logout(): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: 'logout' });
}
