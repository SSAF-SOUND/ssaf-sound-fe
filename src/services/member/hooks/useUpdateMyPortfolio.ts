import type { UserPortfolio } from '~/services/member';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { updateMyPortfolio } from '~/services/member/apis';

export const useUpdateMyPortfolio = () => {
  const queryClient = useQueryClient();
  const setMyPortfolio = (data: UserPortfolio) =>
    queryClient.setQueryData<UserPortfolio>(queryKeys.user.myPortfolio(), data);

  return useMutation({
    mutationFn: updateMyPortfolio,
    onSuccess: (_, variables) => {
      setMyPortfolio(variables);
    },
  });
};
