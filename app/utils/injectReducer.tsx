import * as React from 'react';
import { useStore } from 'react-redux';

import { InjectedStore } from '../types';
import { getInjectors } from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

const useInjectReducer = ({ key, reducer }: any) => {
  const store = useStore() as InjectedStore;
  React.useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
