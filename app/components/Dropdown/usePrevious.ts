import { useRef, useEffect } from 'react';

/*
 * This hook will store the previous value
 */
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default usePrevious;
