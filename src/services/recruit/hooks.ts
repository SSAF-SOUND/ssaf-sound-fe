import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';

import {
  getRecruitApplicants,
  getRecruitDetail,
  getRecruitMembers,
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

export const useRecruitApplicants = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.applicants(recruitId),
    queryFn: () => getRecruitApplicants(recruitId),
  });
};
