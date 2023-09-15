import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitApplicants } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export const useRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.application.applicants(recruitId),
    queryFn: () => getRecruitApplicants(recruitId),
    staleTime: toMs(30),
  });
};
