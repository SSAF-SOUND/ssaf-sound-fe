import type { RecruitApplicationParams } from './types';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruitApplication } from '~/services/recruit/apis';

export const useRecruitApplication = (params: RecruitApplicationParams) => {
  const { recruitId, recruitApplicationId } = params;
  return useQuery({
    queryKey: queryKeys.recruit.application.detail({
      recruitId,
      recruitApplicationId,
    }),
    queryFn: () => getRecruitApplication(recruitApplicationId),
  });
};
