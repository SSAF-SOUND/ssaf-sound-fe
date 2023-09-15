import type {
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit/utils';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { getRecruits } from '~/services/recruit/apis';

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
