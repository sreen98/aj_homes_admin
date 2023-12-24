/**
 * Asynchronously loads the component for Dashboard Page
 */

import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const PropertyManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});

export const PropertyCreateManagement = loadable(() => import('./index-create'), {
  fallback: <LoadingIndicator visible />
});
