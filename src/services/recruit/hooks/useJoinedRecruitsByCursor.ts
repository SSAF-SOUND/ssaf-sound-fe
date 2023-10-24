import type { RecruitCategoryName } from '~/services/recruit';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getJoinedRecruitsByCursor } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export interface UseJoinedRecruitsByCursorParams {
  userId: number;
  category?: RecruitCategoryName;
}

export const useJoinedRecruitsByCursor = (
  params: UseJoinedRecruitsByCursorParams
) => {
  const { userId, category } = params;
  return useInfiniteQuery({
    queryKey: queryKeys.recruit.joinedListByCursor({
      memberId: userId,
      category,
    }),
    queryFn: ({ pageParam }) =>
      getJoinedRecruitsByCursor({
        userId,
        cursor: pageParam,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: toMs(30),
  });
};
