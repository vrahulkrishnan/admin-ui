/**
 * Asynchronously loads the component for UserManagement
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const UserListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});

export const UserDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
