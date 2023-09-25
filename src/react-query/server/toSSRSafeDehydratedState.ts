import type { DehydratedState } from '@tanstack/react-query';

/**
 * - https://github.com/TanStack/query/issues/1458#issuecomment-1022396964
 * - `undefined`가 serialized 대상이 아니므로 발생하는 SSR 오류
 * - infinite queries의 경우, 둘 중 아무거나 사용해도 해결 가능한데 `deepCopy`가 성능 훨씬 안 좋음
 */
export const toSSRSafeDehydratedState = {
  deepCopy: (dehydratedState: DehydratedState) =>
    JSON.parse(JSON.stringify(dehydratedState)),

  infiniteQueries: (dehydratedState: DehydratedState) => {
    dehydratedState.queries.forEach((query) => {
      // eslint-disable-next-line
      // @ts-ignore
      if ('pageParams' in query.state.data) {
        query.state.data.pageParams = [null];
      }
    });

    return dehydratedState;
  },
};
