import type { RecruitCategoryName } from '~/services/recruit';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { defaultRecruitsPageOffset } from '~/services/recruit';
import { getJoinedRecruitsByOffset } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export interface UseJoinedRecruitsByOffsetParams {
  userId: number;
  category?: RecruitCategoryName;
  page?: number;
}

export const useJoinedRecruitsByOffset = (
  params: UseJoinedRecruitsByOffsetParams
) => {
  const { userId, category, page = defaultRecruitsPageOffset } = params;
  return useQuery({
    queryKey: queryKeys.recruit.joinedListByOffset({
      memberId: userId,
      category,
      page,
    }),
    queryFn: () =>
      getJoinedRecruitsByOffset({
        userId,
        page,
        category,
      }),
    keepPreviousData: true,
    staleTime: toMs(30),
  });
};
