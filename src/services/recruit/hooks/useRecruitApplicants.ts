import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitApplicants } from '~/services/recruit/apis2';

export const useRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.application.applicants(recruitId),
    queryFn: () => getRecruitApplicants(recruitId),
  });
};
