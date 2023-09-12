import type {
  RecruitSummary,
  RecruitSummariesQueryStringObject,
  RecruitCursorData,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis/constants';
import { publicAxios } from '~/utils';

export type GetRecruitsParams = Partial<RecruitSummariesQueryStringObject>;

export type GetRecruitsApiData = ApiSuccessResponse<
  { recruits: RecruitSummary[] } & RecruitCursorData
>;

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

  return publicAxios
    .get<GetRecruitsApiData>(endpoint)
    .then((res) => res.data.data);
};
