import type {
  LunchDateSpecifier,
  LunchMenusWithPollStatus,
} from '~/services/lunch/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';
import {
  getLunchMenusWithPollStatus,
  getDateFromLunchDateSpecifier,
  pollLunchMenu,
  revertPolledLunchMenu,
} from '~/services/lunch';

export interface UseLunchMenusWithPollStatusParams {
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const useLunchMenusWithPollStatus = (
  params: UseLunchMenusWithPollStatusParams
) => {
  const { campus, dateSpecifier } = params;
  const date = getDateFromLunchDateSpecifier(dateSpecifier);
  const apiParams = { campus, date };

  return useQuery({
    queryKey: queryKeys.lunch.list({ campus, dateSpecifier }),
    queryFn: () => getLunchMenusWithPollStatus(apiParams),
    staleTime: 30,
  });
};

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

export type UseRevertPolledLunchMenuParams = UsePollLunchMenuParams;

export const useRevertPolledLunchMenu = (
  params: UseRevertPolledLunchMenuParams
) => {
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
    mutationFn: (variables: { lunchId: number; polledIndex: number }) =>
      revertPolledLunchMenu(variables.lunchId),
    onMutate: async (variables) => {
      const { polledIndex } = variables;
      const lunchMenusWithPollStatus =
        queryClient.getQueryData<LunchMenusWithPollStatus>(queryKey);

      if (!lunchMenusWithPollStatus) return;

      setLunchMenusWithPollStatusWithImmer((target) => {
        if (!target) return;

        target.polledAt = -1;
        target.menus[polledIndex].pollCount -= 1;
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
