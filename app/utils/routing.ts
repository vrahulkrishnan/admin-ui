import { matchPath } from 'react-router-dom';
import { history } from './history';
export type RedirectOption = { search?: string; state?: { from?: string } };

export const localRedirect = (path: string, params?: { search?: string; state?: { from?: string } }) => {
  history.push({
    pathname: path,
    search: params?.search ?? '',
    state: params?.state ?? ''
  });
};

export const externalRedirect = (path: string) => {
  window.location.href = path;
};

/**
 * Get decoded query params in the url
 * @return {Object}
 */

export const getDecodedQueryParams = (searchQuery?: string): object =>
  (searchQuery || window.location.search).split(/\?|&/).reduce((accumulated: {}, current: string): {} => {
    const accumulatedData: {} = accumulated;
    if (current) {
      accumulatedData[current.split('=')[0]] = decodeURIComponent(current.split('=')[1]);
    }
    return accumulatedData;
  }, {});

export function getEncodedQueryParams(params: object): any {
  return Object.keys(params)
    .filter(key => Boolean(params[key]))
    .map((key: string): any =>
      [key, encodeURIComponent(typeof params[key] === 'object' ? params[key].value : params[key])].join('=')
    )
    .join('&');
}

export const redirectToLogin = (params: RedirectOption = {}) => {
  localRedirect('/login', params);
};

export const isValidPath = (currPath: string, routes: any = {}) => {
  return Object.keys(routes).map(key => {
    return [...routes[key]].some(it => {
      return matchPath(currPath, it);
    });
  });
};
