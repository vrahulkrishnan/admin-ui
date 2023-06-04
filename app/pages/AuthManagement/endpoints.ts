import request, { ResponseError } from 'utils/request';

export function postLogin(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: 'login', body: { ...data } });
}

export function resetPassword(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `reset-password/${data.userId}`, body: { password: data.password } });
}

export function forgotPassword(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `forgot-password`, body: { ...data } });
}

export function verifyResetLink(link: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `verify-user/${link}` });
}
