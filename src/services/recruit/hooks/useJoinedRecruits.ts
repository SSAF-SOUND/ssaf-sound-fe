import type { RecruitCategoryName } from '~/services/recruit';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getJoinedRecruits } from '~/services/recruit/apis';

export interface UseJoinedRecruits {
  userId: number;
  category?: RecruitCategoryName;
}

export const useJoinedRecruits = (params: UseJoinedRecruits) => {
  const { userId, category } = params;
  return useInfiniteQuery({
    queryKey: queryKeys.recruit.joinedList({ memberId: userId, category }),
    queryFn: ({ pageParam }) =>
      getJoinedRecruits({
        userId,
        cursor: pageParam,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
  });
};
