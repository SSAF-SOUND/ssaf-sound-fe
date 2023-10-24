import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitsByCursor } from '~/services/recruit/apis';
import { toMs } from '~/utils/toMs';

export type UseRecruitsByCursorOptions = Partial<RecruitsListPageRouteQuery>;

export const useRecruitsByCursor = (
  options: UseRecruitsByCursorOptions = {}
) => {
  const { category, keyword, includeCompleted, recruitParts, skills } = options;

  const queryKey = queryKeys.recruit.listByCursor({
    includeCompleted,
    keyword,
    recruitParts,
    skills,
    category,
  });

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getRecruitsByCursor({
        cursor: pageParam,
        keyword,
        includeCompleted,
        recruitParts,
        skills,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: toMs(60),
  });
};
