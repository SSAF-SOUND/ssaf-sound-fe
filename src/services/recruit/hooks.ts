import { useMutation } from '@tanstack/react-query';

import { recruitAPI } from './apis';

export const useApplyRecruit = () => {
  return useMutation({
    mutationFn: recruitAPI.postRecruitApply,
  });
};
