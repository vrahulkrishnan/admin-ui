/**
 * Asynchronously loads the component for ActivityPage
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const ActivityListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});
export const ActivityAddManagement = loadable(() => import('./index-add'), {
  fallback: <LoadingIndicator visible />
});
export const ActivityDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
