import type {
  LunchDateSpecifier,
  LunchMenusWithPollStatus,
} from '~/services/lunch/utils';

import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';

interface UseSetLunchMenusWithPollStatusWithImmerParams {
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const useSetLunchMenusWithPollStatusWithImmer = (
  params: UseSetLunchMenusWithPollStatusWithImmerParams
) => {
  const { campus, dateSpecifier } = params;
  const queryClient = useQueryClient();

  const setLunchMenusWithPollStatusWithImmer = (
    recipe: (lunchMenusWithPollStatus?: LunchMenusWithPollStatus) => void
  ) => {
    const queryKey = queryKeys.lunch.list({ campus, dateSpecifier });

    queryClient.setQueryData<LunchMenusWithPollStatus>(
      queryKey,
      (prevLunchMenusWithPollStatus) => {
        if (!prevLunchMenusWithPollStatus) return;

        const nextLunchMenusWithPollStatus = produce(
          prevLunchMenusWithPollStatus,
          (draft) => recipe(draft)
        );

        return nextLunchMenusWithPollStatus;
      }
    );
  };

  return setLunchMenusWithPollStatusWithImmer;
};
