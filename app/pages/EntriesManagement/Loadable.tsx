/**
 * Asynchronously loads the component for Entries Management
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const EntriesManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});
