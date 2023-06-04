// This function will convert the word from snakecase to camelcase
const tc = s => s.replace(/(_\w)/g, $1 => $1[1].toUpperCase());

// This function will convert the word from camelcase to snakecase
const ts = s => s.replace(/[\w]([A-Z])/g, $1 => `${$1[0]}_${$1[1]}`).toLowerCase();

const isArray = a => Array.isArray(a);
const isObject = o => o === Object(o) && !isArray(o) && typeof o !== 'function';

/*
 * convert the keys recursively into snakecase or camelcase based on second argument
 * For camelcase, t = true and for snakecase, t = false
 */
const convertKey = (o, t) => {
  if (isObject(o)) {
    const n = {};
    const func = t ? tc : ts;
    Object.keys(o).forEach(k => {
      n[func(k)] = convertKey(o[k], t);
    });
    return n;
  } else if (isArray(o)) {
    return o.map(i => convertKey(i, t));
  }
  return o;
};

export const keysToCamel = d => convertKey(d, true);
export const keysToSnake = d => convertKey(d, false);
