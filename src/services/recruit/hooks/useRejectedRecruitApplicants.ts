import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRejectedRecruitApplicants } from '~/services/recruit';

export const useRejectedRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.application.rejectedApplicants(recruitId),
    queryFn: () => getRejectedRecruitApplicants(recruitId),
  });
};
