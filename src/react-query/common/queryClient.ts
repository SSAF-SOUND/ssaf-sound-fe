import { QueryClient } from '@tanstack/react-query';

import { GlobalSymbol } from '~/utils/constants';

let queryClient: QueryClient;

const getQueryClient = () => {
  if (queryClient) return queryClient;

  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: retryFunction,
      },
    },
  });

  return queryClient;
};

export default getQueryClient;

const maxFailureCount = 3;
const retryFunction = (failureCount: number, error: unknown) => {
  if (error === GlobalSymbol.QUIT_REQUEST_RETRY) {
    return false;
  }

  return maxFailureCount > failureCount;
};
