const DOMAIN = process.env.DOMAIN || '';
export const getCookie = (cookieName: string): any => {
  const cookieMatch = document.cookie.match(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`);

  return cookieMatch ? cookieMatch.pop() : '';
};

export const removeCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${DOMAIN}`;
};

export const setCookie = (cookieName: string, cookieValue: string): any => {
  const date = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  const expires = '; expires=' + date;
  document.cookie = `${cookieName}=${cookieValue} ${expires} ; path=/; domain=${DOMAIN}`;
};

export const getLocalStorage = (itemName: string) => localStorage.getItem(itemName);

export const setLocalStorage = (itemName: string, itemValue: string) => localStorage.setItem(itemName, itemValue);

export const removeLocalStorage = (itemName: string) => localStorage.removeItem(itemName);
