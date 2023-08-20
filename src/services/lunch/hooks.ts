import type { LunchDateSpecifier } from '~/services/lunch/utils';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getLunchMenuSummaries } from '~/services/lunch/api';
import { getDateFromLunchDateSpecifier } from '~/services/lunch/utils';

export interface UseLunchMenuSummariesParams {
  campus: string;
  dateSpecifier: LunchDateSpecifier;
}

export const useLunchMenuSummaries = (params: UseLunchMenuSummariesParams) => {
  const { campus, dateSpecifier } = params;
  const date = getDateFromLunchDateSpecifier(dateSpecifier);
  const apiParams = { campus, date };

  return useQuery({
    queryKey: queryKeys.lunch.summaries(apiParams),
    queryFn: () => getLunchMenuSummaries(apiParams),
  });
};
