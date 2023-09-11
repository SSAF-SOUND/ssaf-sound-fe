import type {
  RecruitCategoryName,
  RecruitParts,
  RecruitSummary,
  SkillName,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis/constants';
import { publicAxios } from '~/utils';

export interface GetRecruitsParams {
  cursor?: number;
  size?: number;
  keyword?: string;

  category: RecruitCategoryName;
  completed?: boolean;
  recruitParts?: RecruitParts[];
  skills?: SkillName[];
}

export type GetRecruitsApiData = ApiSuccessResponse<{
  nextCursor: number;
  isLast: boolean;
  recruits: RecruitSummary[];
}>;

export const getRecruits = (params: GetRecruitsParams) => {
  const {
    size = defaultRecruitsPageSize,
    cursor = defaultRecruitsPageCursor,
    category,
    completed = false,
    recruitParts = [],
    skills = [],
    keyword,
  } = params;

  const endpoint = endpoints.recruit.list({
    size,
    cursor,
    category,
    completed,
    recruitParts,
    skills,
    keyword,
  });

  console.log(endpoint);

  return publicAxios
    .get<GetRecruitsApiData>(endpoint)
    .then((res) => res.data.data);
};
