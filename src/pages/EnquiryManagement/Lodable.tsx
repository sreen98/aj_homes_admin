/**
 * Asynchronously loads the component for Enquiry Page
 */

import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const EnquiryManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});
