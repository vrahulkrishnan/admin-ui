import { history } from './history';
import { removeCookie } from './storage';

const API_URL = process.env.API_URL || '';

type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

interface ReqOptions {
  endpoint: string;
  body?: object;
  params?: object;
  headers?: object;
  code?: string;
  credentials?: 'omit' | 'same-origin' | 'include';
  type?: 'normal' | 'external' | 'internal';
}

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return response;
  }
  if (
    response.headers.get('Content-Type') === 'application/pdf' ||
    response.headers.get('Content-Type') === 'application/octet-stream; charset=utf-8'
  ) {
    return response.blob();
  } else if (response.headers.get('Content-Type') === 'text/html;charset=UTF-8') {
    return response.text();
  }

  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    localStorage.clear();
    removeCookie('adminUserToken');
    if (history.location.pathname !== '/login') {
      history.push('/login', { from: { pathname: history.location.pathname } });
    }
  } else if (response.status >= 400) {
    return response.json().then(res => {
      throw res;
    });
  }

  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

export function getUrlWithQueryParams(base: string, queryData: object = {}): string {
  const queries = Object.keys(queryData);

  return queries.reduce((acc: string, query: string, index: number): string => {
    const url = `${acc}${encodeURIComponent(query)}=${encodeURIComponent(queryData[query])}`;

    return index + 1 < queries.length ? `${url}&` : url;
  }, `${base}?`);
}

export function getReqUrl({ params, type = 'normal', endpoint }: ReqOptions): string {
  const url = {
    normal: `${API_URL}/${endpoint}`,
    external: endpoint
  }[type];

  return params ? getUrlWithQueryParams(url, params) : url;
}

export function getReqOptions(method: MethodType, { headers, body, code }: ReqOptions): any {
  const reqHeaders = {
    Accept: 'application/json',
    ...headers
  };

  const requestOptions: any = {
    method,
    mode: 'cors'
  };
  if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
    if (body instanceof FormData) {
      requestOptions.body = body;
    } else {
      reqHeaders['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
  }
  requestOptions.headers = reqHeaders;

  return requestOptions;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(method: MethodType, reqOptions: ReqOptions): Promise<Response> {
  const url = getReqUrl(reqOptions);
  const options = getReqOptions(method, reqOptions);
  options.credentials = reqOptions.credentials || 'include';
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export function getAPIUrl(endpoint: string): string {
  return `${API_URL}/${endpoint}`;
}

export default {
  GET: (req: ReqOptions): Promise<Response> => request('GET', req),
  POST: (req: ReqOptions): Promise<Response> => request('POST', req),
  PUT: (req: ReqOptions): Promise<Response> => request('PUT', req),
  DELETE: (req: ReqOptions): Promise<Response> => request('DELETE', req),
  PATCH: (req: ReqOptions): Promise<Response> => request('PATCH', req)
};
