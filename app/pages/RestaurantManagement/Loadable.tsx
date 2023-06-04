/**
 * Asynchronously loads the component for RestaurantPage
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const RestaurantListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});
export const RestaurantAddManagement = loadable(() => import('./index-add'), {
  fallback: <LoadingIndicator visible />
});
export const RestaurantDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
