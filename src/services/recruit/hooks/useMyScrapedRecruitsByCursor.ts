import type { RecruitCategoryName } from '~/services/recruit/utils';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getMyScrapedRecruitsByCursor } from '~/services/recruit/apis';
import {toMs} from "~/utils";

export interface UseMyScrapedRecruitsByCursorParams {
  category?: RecruitCategoryName;
}

export const useMyScrapedRecruitsByCursor = (
  params: UseMyScrapedRecruitsByCursorParams = {}
) => {
  const { category } = params;
  return useInfiniteQuery({
    queryKey: queryKeys.recruit.myScrapsByCursor({ category }),
    queryFn: ({ pageParam }) =>
      getMyScrapedRecruitsByCursor({
        cursor: pageParam,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: toMs(30),

  });
};
