/**
 * Asynchronously loads the component for LocationPage
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const LocationListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});
export const LocationAddManagement = loadable(() => import('./index-add'), {
  fallback: <LoadingIndicator visible />
});
export const LocationDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
