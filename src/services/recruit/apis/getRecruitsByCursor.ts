import type { InfiniteParams } from '~/services/common';
import type {
  RecruitSummary,
  RecruitCursorData,
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';
import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis/constants';
import { publicAxios } from '~/utils';

export type GetRecruitsByCursorParams = Partial<
  RecruitsListPageRouteQuery & InfiniteParams
>;

export type GetRecruitsByCursorApiData = ApiSuccessResponse<
  { recruits: RecruitSummary[] } & RecruitCursorData
>;

export interface GetRecruitsByCursorQueryParams extends InfiniteParams {
  category?: RecruitCategoryName;
  keyword?: string;
  isFinished?: boolean;
  recruitTypes?: RecruitParts | RecruitParts[];
  skills?: SkillName | SkillName[];
}

export const getRecruitsByCursor = (params: GetRecruitsByCursorParams = {}) => {
  const {
    size = defaultRecruitsPageSize,
    cursor = defaultRecruitsPageCursor,
    category,
    includeCompleted = false,
    recruitParts,
    skills,
    keyword,
  } = params;

  const endpoint = endpoints.recruit.listByCursor();
  const queryParams: GetRecruitsByCursorQueryParams = {
    size,
    cursor,
    category,
    isFinished: includeCompleted,
    recruitTypes: recruitParts,
    skills,
    keyword,
  };

  return publicAxios<GetRecruitsByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
