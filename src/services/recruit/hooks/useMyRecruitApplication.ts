import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyRecruitApplication } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export const useMyRecruitApplication = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.application.mine(recruitId),
    queryFn: () => getMyRecruitApplication(recruitId),
    staleTime: toMs(30),
  });
};
