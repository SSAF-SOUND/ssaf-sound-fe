import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitDetail } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export interface UseRecruitDetailOptions {
  enabled: boolean;
}

export const useRecruitDetail = (
  recruitId: number,
  options: Partial<UseRecruitDetailOptions> = {}
) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
    enabled,
    staleTime: toMs(30),
  });
};
