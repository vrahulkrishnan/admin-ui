import { useState, useEffect } from 'react';

function getDimensions(el?: any) {
  const width = el ? el.offsetWidth : window.innerWidth;
  const height = el ? el.offsetHeight : window.innerHeight;

  return { width, height };
}

import usePrevious from './usePrevious';

const initialState = { width: 0, height: 0 };

export default function useWindowDimensions(element?: any) {
  const [dimensions, setDimensions] = useState(element ? initialState : getDimensions());

  const prevEl = usePrevious(element);

  function handleResize() {
    setDimensions(getDimensions(element));
  }

  useEffect(() => {
    if (element && prevEl === null) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [element]);

  return dimensions;
}
