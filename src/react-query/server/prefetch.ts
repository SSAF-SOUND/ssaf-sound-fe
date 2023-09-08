import { dehydrate, QueryClient } from '@tanstack/react-query';

type QueryKey = unknown[];
// eslint-disable-next-line
type QueryFn = (...args: any[]) => Promise<any>;
type QueryOption = { queryKey: QueryKey; queryFn: QueryFn };

/**
 * 서버 렌더링시 prefetch -> dehydrate 과정에서 사용할 수 있는 helper 입니다.
 *
 * 여러 쿼리를 prefetch해야 하는 경우에는 `option`객체를 배열로 전달합니다.
 *
 * @example
 *   const dehydrate = prefetch({ queryKey, queryFn });
 *   const { dehydratedState } = await dehydrate();
 */
export const prefetch = (option: QueryOption | QueryOption[]) => {
  const queryClient = new QueryClient();
  const options = Array.isArray(option) ? option : [option];

  const result = Promise.allSettled(
    options.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery(queryKey, queryFn)
    )
  );

  return () =>
    result.then(() => {
      return {
        dehydratedState: dehydrate(queryClient),
      };
    });
};
