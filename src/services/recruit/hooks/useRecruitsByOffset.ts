import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  getRecruitsByOffset,
} from '~/services/recruit/apis';
import { toMs } from '~/utils/toMs';

export type UseRecruitsByOffsetOptions = Partial<RecruitsListPageRouteQuery>;

export const useRecruitsByOffset = (
  options: UseRecruitsByOffsetOptions = {}
) => {
  const {
    category,
    keyword,
    includeCompleted,
    recruitParts,
    skills,
    page = defaultRecruitsPageOffset,
  } = options;

  const queryKey = queryKeys.recruit.listByOffset({
    includeCompleted,
    keyword,
    recruitParts,
    skills,
    category,
    page,
  });

  return useQuery({
    queryKey,
    queryFn: () =>
      getRecruitsByOffset({
        page,
        keyword,
        includeCompleted,
        recruitParts,
        skills,
        category,
      }),
    keepPreviousData: true,
    staleTime: toMs(30),
  });
};
