import type { RecruitParams } from './apis2';

import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { createRecruit } from '~/services/recruit/apis';
import {
  postRecruitApplicationCancel,
  postRecruitApplicationReject,
  postRecruitApplicationApprove,
  getRecruitApplicationDetail,
  getRecruitApplicants,
  getRecruitDetail,
  getRecruitMembers,
  getRecruits,
  recruitAPI,
} from '~/services/recruit/apis2';

export const useApplyRecruit = () => {
  return useMutation({
    mutationFn: recruitAPI.postRecruitApply,
  });
};

export const useRecruitDetail = (recruitId: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
    enabled: enabled,
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
