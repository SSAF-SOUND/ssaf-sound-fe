import type { LunchDateSpecifier } from '~/services/lunch/utils';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getLunchMenusWithPollStatus } from '~/services/lunch/apis';
import { getDateFromLunchDateSpecifier } from '~/services/lunch/utils';
import { toMs } from '~/utils/toMs';

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
    staleTime: toMs(30),
  });
};
