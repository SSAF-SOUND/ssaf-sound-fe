import type { RecruitsPageRouteQuery } from '~/utils/client-routes/recruits';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruits } from '~/services/recruit/apis';
import { toMs } from '~/utils/toMs';

export type UseRecruitsOptions = Partial<RecruitsPageRouteQuery>;

export const useRecruits = (options: UseRecruitsOptions = {}) => {
  const { category, keyword, includeCompleted, recruitParts, skills } = options;

  const queryKey = queryKeys.recruit.list({
    includeCompleted,
    keyword,
    recruitParts,
    skills,
    category,
  });

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getRecruits({
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
