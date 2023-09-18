import type { SetStateAction } from 'react';
import type { RecruitApplicationDetail } from '~/services/recruit/apis';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

export const useSetRecruitApplication = (recruitId: number) => {
  const queryClient = useQueryClient();
  const setRecruitApplication = (
    recruitApplicationId: number,
    updater: SetStateAction<RecruitApplicationDetail | undefined>
  ) => {
    const queryKey = queryKeys.recruit.application.detail({
      recruitId,
      recruitApplicationId,
    });

    queryClient.setQueryData<RecruitApplicationDetail>(queryKey, updater);
  };

  return setRecruitApplication;
};
