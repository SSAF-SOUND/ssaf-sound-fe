import type {
  LunchDateSpecifier,
  LunchMenusWithPollStatus,
} from '~/services/lunch/utils';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { pollLunchMenu } from '~/services/lunch/apis';
import { useSetLunchMenusWithPollStatusWithImmer } from '~/services/lunch/hooks';

export interface UsePollLunchMenuParams {
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const usePollLunchMenu = (params: UsePollLunchMenuParams) => {
  const { campus, dateSpecifier } = params;

  const queryClient = useQueryClient();
  const setLunchMenusWithPollStatusWithImmer =
    useSetLunchMenusWithPollStatusWithImmer({
      campus,
      dateSpecifier,
    });

  const queryKey = queryKeys.lunch.list({ campus, dateSpecifier });

  const invalidateLunchMenusWithPollStatus = () => {
    queryClient.invalidateQueries({
      queryKey: queryKey,
    });
  };

  return useMutation({
    mutationFn: (variables: { polledIndex: number; lunchId: number }) =>
      pollLunchMenu(variables.lunchId),
    onMutate: async (variables) => {
      const { polledIndex } = variables;
      const lunchMenusWithPollStatus =
        queryClient.getQueryData<LunchMenusWithPollStatus>(queryKey);

      if (!lunchMenusWithPollStatus) return;

      setLunchMenusWithPollStatusWithImmer((target) => {
        if (!target) return;

        const prevPolledAt = target.polledAt;
        if (prevPolledAt > -1) target.menus[prevPolledAt].pollCount -= 1;
        target.polledAt = polledIndex;
        target.menus[polledIndex].pollCount += 1;
      });

      return { prevLunchMenusWithPollStatus: lunchMenusWithPollStatus };
    },
    onError: (err, _, context) => {
      const prevLunchMenusWithPollStatus =
        context?.prevLunchMenusWithPollStatus;
      queryClient.setQueryData<LunchMenusWithPollStatus>(
        queryKey,
        prevLunchMenusWithPollStatus
      );
    },
    onSuccess: () => {
      invalidateLunchMenusWithPollStatus();
    },
  });
};
