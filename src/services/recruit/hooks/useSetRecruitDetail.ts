import type { SetStateAction } from 'react';
import type { RecruitDetail } from '~/services/recruit/apis';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

export const useSetRecruitDetail = (recruitId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruit.detail(recruitId);
  const setRecruitDetail = (
    updater: SetStateAction<RecruitDetail | undefined>
  ) => {
    queryClient.setQueryData<RecruitDetail>(queryKey, updater);
  };

  return setRecruitDetail;
};
