import type { SetStateAction } from 'react';
import type {
  ApplyRecruitParams,
  MyRecruitApplicationDetail,
  RecruitDetail,
} from '~/services/recruit/apis';
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
  applyRecruit,
  getMyRecruitApplication,
  getRecruitApplication,
  cancelRecruitApplication,
  rejectRecruitApplication,
  approveRecruitApplication,
} from '~/services/recruit/apis';
import {
  getRecruitApplicants,
  getRecruitMembers,
} from '~/services/recruit/apis2';

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
    staleTime: 60 * 1000,
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
  const setRecruitDetail = (
    updater: SetStateAction<RecruitDetail | undefined>
  ) => {
    queryClient.setQueryData<RecruitDetail>(queryKey, updater);
  };

  return setRecruitDetail;
};

export const useCompleteRecruit = (recruitId: number) => {
  return useMutation({
    mutationFn: () => completeRecruit(recruitId),
  });
};

export interface UseRecruitsOptions {
  category: RecruitCategoryName;
  keyword: string;
  skills: SkillName[];
  recruitParts: RecruitParts[];
  completed: boolean;
}

export const useRecruits = (options: Partial<UseRecruitsOptions> = {}) => {
  const { category, keyword, completed, recruitParts, skills } = options;

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

export const useApplyRecruit = (recruitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApplyRecruitParams) => applyRecruit(recruitId, params),
    onSuccess: () =>
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId)),
  });
};

export const useMyRecruitApplication = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruit.application.mine(recruitId),
    queryFn: () => getMyRecruitApplication(recruitId),
    staleTime: 30 * 1000,
  });
};

export interface UseRecruitApplicationParams {
  recruitId: number;
  recruitApplicationId: number;
}

export const useRecruitApplication = (params: UseRecruitApplicationParams) => {
  const { recruitId, recruitApplicationId } = params;
  return useQuery({
    queryKey: queryKeys.recruit.application.detail({
      recruitId,
      recruitApplicationId,
    }),
    queryFn: () => getRecruitApplication(recruitApplicationId),
    staleTime: 30 * 1000,
  });
};

interface UseCancelRecruitApplicationParams {
  recruitId: number;
  recruitApplicationId: number;
}

// 성공시 내 신청서의 매칭 상태를 바꿈
export const useCancelRecruitApplication = (
  params: UseCancelRecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.setQueryData<MyRecruitApplicationDetail>(
        queryKeys.recruit.application.mine(recruitId),
        (prev) => {
          if (!prev) return;
          return { ...prev, matchStatus };
        }
      );
    },
  });
};

type UseRejectRecruitApplicationParams = UseCancelRecruitApplicationParams;

// 신청서의 상태가 바뀜
export const useRejectRecruitApplication = (
  params: UseRejectRecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => rejectRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.setQueryData<MyRecruitApplicationDetail>(
        queryKeys.recruit.application.detail({
          recruitId,
          recruitApplicationId,
        }),
        (prev) => {
          if (!prev) return;
          return { ...prev, matchStatus };
        }
      );
    },
  });
};

type UseApproveRecruitApplicationParams = UseCancelRecruitApplicationParams;

// 신청서의 상태가 바뀜
export const useApproveRecruitApplication = (
  params: UseApproveRecruitApplicationParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => approveRecruitApplication(recruitApplicationId),
    onSuccess: ({ matchStatus }) => {
      queryClient.invalidateQueries(queryKeys.recruit.detail(recruitId));
      queryClient.setQueryData<MyRecruitApplicationDetail>(
        queryKeys.recruit.application.detail({
          recruitId,
          recruitApplicationId,
        }),
        (prev) => {
          if (!prev) return;
          return { ...prev, matchStatus };
        }
      );
    },
  });
};
