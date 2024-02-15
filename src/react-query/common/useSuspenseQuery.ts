import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';

export const useSuspenseQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'initialData'
  > & {
    initialData?: () => undefined;
  }
) => {
  options.suspense = true;
  const query = useQuery<TQueryFnData, TError, TData, TQueryKey>(options);

  return {
    ...query,
    data: query.data as NonNullable<typeof query.data>,
  };
};
