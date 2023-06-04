const replacer = () => {
  const cache: any = [];
  return (key: any, value: any) => {
    if (value !== null && typeof value === 'object' && cache.indexOf(value) >= 0) {
      return '[ circular ]';
    }
    cache.push(value);
    return value;
  };
};

export const compare = (a: any, b: any) => JSON.stringify(a, replacer()) === JSON.stringify(b, replacer());
