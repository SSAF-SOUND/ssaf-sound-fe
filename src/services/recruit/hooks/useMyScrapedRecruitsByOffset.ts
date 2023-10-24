import type { RecruitCategoryName } from '~/services/recruit/utils';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  getMyScrapedRecruitsByOffset,
} from '~/services/recruit/apis';
import { toMs } from '~/utils';

export interface UseMyScrapedRecruitsByOffsetParams {
  category?: RecruitCategoryName;
  page?: number;
}

export const useMyScrapedRecruitsByOffset = (
  params: UseMyScrapedRecruitsByOffsetParams = {}
) => {
  const { category, page = defaultRecruitsPageOffset } = params;
  return useQuery({
    queryKey: queryKeys.recruit.myScrapsByOffset({ category }),
    queryFn: () =>
      getMyScrapedRecruitsByOffset({
        page,
        category,
      }),
    keepPreviousData: true,
    staleTime: toMs(30),
  });
};
