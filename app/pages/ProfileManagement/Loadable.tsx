/**
 * Asynchronously loads the component for ProfileManagement
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const ProfileManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});
