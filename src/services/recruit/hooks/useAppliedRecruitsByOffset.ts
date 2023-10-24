import type {
  RecruitCategoryName,
  MatchStatus,
} from '~/services/recruit/utils';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  getAppliedRecruitsByOffset,
} from '~/services/recruit/apis';

export interface UseAppliedRecruitsByOffsetParams {
  category?: RecruitCategoryName;
  matchStatus?: MatchStatus;
  page?: number;
}

export const useAppliedRecruitsByOffset = (
  params: UseAppliedRecruitsByOffsetParams
) => {
  const { matchStatus, category, page = defaultRecruitsPageOffset } = params;
  return useQuery({
    queryKey: queryKeys.recruit.appliedListByOffset.filter({
      matchStatus,
      category,
      page,
    }),
    queryFn: () =>
      getAppliedRecruitsByOffset({
        matchStatus,
        category,
        page,
      }),
    keepPreviousData: true,
  });
};
