import type { LunchDateSpecifier } from '~/services/lunch/utils';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getLunchMenuWithPollStatus , getDateFromLunchDateSpecifier } from '~/services/lunch';

export interface UseLunchMenusWithPollStatusParams {
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const useLunchMenusWithPollStatus = (params: UseLunchMenusWithPollStatusParams) => {
  const { campus, dateSpecifier } = params;
  const date = getDateFromLunchDateSpecifier(dateSpecifier);
  const apiParams = { campus, date };

  return useQuery({
    queryKey: queryKeys.lunch.summaries(apiParams),
    queryFn: () => getLunchMenuWithPollStatus(apiParams),
  });
};
