import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitParticipants } from '~/services/recruit/apis';
import { toMs } from '~/utils';

export const useRecruitParticipants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.participants(recruitId),
    queryFn: () => getRecruitParticipants(recruitId),
    staleTime: toMs(30),
  });
};
