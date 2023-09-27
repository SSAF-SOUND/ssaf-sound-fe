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

// `failureCount === retryFailureCount`으로, 초깃값이 0임.
// 최초 실패시 2번 더 재시도 (총 3회)
const maxFailureCount = 2;
const retryFunction = (failureCount: number, error: unknown) => {
  if (error === GlobalSymbol.QUIT_REQUEST_RETRY) {
    return false;
  }

  return maxFailureCount > failureCount;
};
