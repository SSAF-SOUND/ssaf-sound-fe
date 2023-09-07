import type { RecruitParams } from './apis';

import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

import {
  getRecruitApplicants,
  getRecruitDetail,
  getRecruitMembers,
  getRecruits,
  recruitAPI,
} from './apis';

export const useApplyRecruit = () => {
  return useMutation({
    mutationFn: recruitAPI.postRecruitApply,
  });
};

export const useRecruitDetail = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
  });
};

export const useRecruitMembers = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.members(recruitId),
    queryFn: () => getRecruitMembers(recruitId),
  });
};

export const useInfiniteRecruits = (options: Partial<RecruitParams> = {}) => {
  const queryKey = queryKeys.recruit.list(options);

  return useInfiniteQuery({
    queryKey,
    queryFn: (d) => {
      return getRecruits({
        cursor: d.pageParam,
        recruits: options,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return;
      return lastPage.cursor ?? null;
    },
    staleTime: Infinity,
  });
};

export const useRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.applicants(recruitId),
    queryFn: () => getRecruitApplicants(recruitId),
  });
};
