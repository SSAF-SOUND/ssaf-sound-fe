import type { SetStateAction } from 'react';
import type { RecruitDetail } from '~/services/recruit/apis';
import type { UpdateRecruitParams } from '~/services/recruit/apis/updateRecruit';
import type {
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit/utils';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  completeRecruit,
  createRecruit,
  getRecruitDetail,
  getRecruitParticipants,
  getRecruits,
  removeRecruit,
  scrapRecruit,
  updateRecruit,
} from '~/services/recruit/apis';
import {
  getRecruitApplicants,
  getRecruitApplicationDetail,
  getRecruitMembers,
  postRecruitApplicationApprove,
  postRecruitApplicationCancel,
  postRecruitApplicationReject,
  recruitAPI,
} from '~/services/recruit/apis2';

export const useApplyRecruit = () => {
  return useMutation({
    mutationFn: recruitAPI.postRecruitApply,
  });
};

export const useRecruitMembers = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.members(recruitId),
    queryFn: () => getRecruitMembers(recruitId),
  });
};

export const useRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.applicants(recruitId),
    queryFn: () => getRecruitApplicants(recruitId),
  });
};

export const useRecruitApplicationDetail = (recruitApplicationId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.applicationDetail(recruitApplicationId),
    queryFn: () => getRecruitApplicationDetail(recruitApplicationId),
  });
};

export const useRecruitApplicationApprove = () => {
  return useMutation({
    mutationFn: postRecruitApplicationApprove,
  });
};

export const useRecruitApplicationReject = () => {
  return useMutation({
    mutationFn: postRecruitApplicationReject,
  });
};

export const useRecruitApplicationCancel = () => {
  return useMutation({
    mutationFn: postRecruitApplicationCancel,
  });
};

//

export const useCreateRecruit = () => {
  return useMutation({
    mutationFn: createRecruit,
  });
};

export interface UseRecruitDetailOptions {
  enabled: boolean;
}

export const useRecruitDetail = (
  recruitId: number,
  options: Partial<UseRecruitDetailOptions> = {}
) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
    enabled,
  });
};

export const useRecruitParticipants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.participants(recruitId),
    queryFn: () => getRecruitParticipants(recruitId),
  });
};

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

export const useRemoveRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: () => removeRecruit(recruitId),
  });
};

export const useUpdateRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: (params: UpdateRecruitParams) =>
      updateRecruit(recruitId, params),
  });
};

export const useSetRecruitDetail = (recruitId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruit.detail(recruitId);
  const setArticleDetail = (
    updater: SetStateAction<RecruitDetail | undefined>
  ) => {
    queryClient.setQueryData<RecruitDetail>(queryKey, updater);
  };

  return setArticleDetail;
};

export const useCompleteRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: () => completeRecruit(recruitId),
  });
};

export interface UseRecruitsParams {
  category: RecruitCategoryName;
}

export interface UseRecruitsOptions {
  keyword: string;
  skills: SkillName[];
  recruitParts: RecruitParts[];
  completed: boolean;
}

export const useRecruits = (
  params: UseRecruitsParams,
  options: Partial<UseRecruitsOptions> = {}
) => {
  const { category } = params;
  const { keyword, completed, recruitParts, skills } = options;

  const queryKey = queryKeys.recruit.list({
    completed,
    keyword,
    recruitParts,
    skills,
    category,
  });

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getRecruits({
        cursor: pageParam,
        keyword,
        completed,
        recruitParts,
        skills,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
  });
};
