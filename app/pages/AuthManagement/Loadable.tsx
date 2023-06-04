/**
 * Asynchronously loads the component for AuthPage
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const AuthManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});
