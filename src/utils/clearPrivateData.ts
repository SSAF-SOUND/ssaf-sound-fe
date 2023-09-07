import type { QueryClient } from '@tanstack/react-query';

import { getQueryClient, queryKeys } from '~/react-query/common';
import { webStorage } from '~/utils/webStorage';

export const clearPrivateData = (
  queryClient: QueryClient = getQueryClient()
) => {
  queryClient.resetQueries(queryKeys.auth());
  webStorage.clearPrivateData();
};
