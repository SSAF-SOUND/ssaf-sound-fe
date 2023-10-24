import type { RecruitDetail } from '~/services/recruit/apis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { scrapRecruit } from '~/services/recruit/apis';

import { useSetRecruitDetail } from './useSetRecruitDetail';

export const useScrapRecruit = (recruitId: number) => {
  const setRecruitDetail = useSetRecruitDetail(recruitId);
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruit.detail(recruitId);

  return useMutation({
    mutationFn: () => scrapRecruit(recruitId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const recruit = queryClient.getQueryData<RecruitDetail>(queryKey);
      if (!recruit) return;

      const { scraped: prevScraped, scrapCount: prevScrapCount } = recruit;
      const nextScraped = !prevScraped;
      const nextScrapCount = nextScraped
        ? prevScrapCount + 1
        : prevScrapCount - 1;

      setRecruitDetail((prevRecruit) => {
        if (!prevRecruit) return;
        return {
          ...prevRecruit,
          scraped: nextScraped,
          scrapCount: nextScrapCount,
        };
      });
      return { prevRecruit: recruit };
    },
    onSuccess: ({ scraped, scrapCount }) => {
      queryClient.invalidateQueries(queryKeys.recruit.myScrapsByCursor());
      setRecruitDetail((prevRecruit) => {
        if (!prevRecruit) return;
        return {
          ...prevRecruit,
          scraped,
          scrapCount,
        };
      });
    },
    onError: (err, _, context) => {
      const prevRecruit = context?.prevRecruit;
      setRecruitDetail(prevRecruit);
    },
  });
};
