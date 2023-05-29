import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient;

const getQueryClient = () => {
  if (queryClient) return queryClient;

  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return queryClient;
};

export default getQueryClient;
