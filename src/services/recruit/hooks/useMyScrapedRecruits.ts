import type { RecruitCategoryName } from '~/services/recruit/utils';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyScrapedRecruits } from '~/services/recruit/apis';

interface UseMyScrapedRecruitsParams {
  category?: RecruitCategoryName;
}

export const useMyScrapedRecruits = (
  params: UseMyScrapedRecruitsParams = {}
) => {
  const { category } = params;
  return useInfiniteQuery({
    queryKey: queryKeys.recruit.myScraped({ category }),
    queryFn: ({ pageParam }) =>
      getMyScrapedRecruits({
        cursor: pageParam,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
  });
};
