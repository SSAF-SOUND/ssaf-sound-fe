import type { RecruitCategoryName , MatchStatus } from '~/services/recruit/utils';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getAppliedRecruitsByCursor } from '~/services/recruit/apis';

export interface UseAppliedRecruitsByCursorParams {
  category?: RecruitCategoryName;
  matchStatus?: MatchStatus;
}

export const useAppliedRecruitsByCursor = (params: UseAppliedRecruitsByCursorParams) => {
  const { matchStatus, category } = params;
  return useInfiniteQuery({
    queryKey: queryKeys.recruit.appliedListByCursor.filter({ matchStatus, category }),
    queryFn: ({ pageParam }) =>
      getAppliedRecruitsByCursor({
        matchStatus,
        category,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
  });
};
