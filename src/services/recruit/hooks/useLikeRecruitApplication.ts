import { useMutation } from '@tanstack/react-query';

import { likeRecruitApplication } from '~/services/recruit/apis';

interface UseLikeRecruitApplicationParams {
  recruitId: number;
  recruitApplicationId: number;
}

export const useLikeRecruitApplication = (
  params: UseLikeRecruitApplicationParams
) => {
  const { recruitApplicationId, recruitId } = params;

  // `useRecruitApplication`의 liked 교체
  // `useRecruitApplicants`의 liked 교체
  return useMutation({
    mutationFn: () => likeRecruitApplication(recruitApplicationId),
    onSuccess: () => {},
  });
};
