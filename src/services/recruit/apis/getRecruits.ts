import type { InfiniteParams } from '~/services/common';
import type {
  RecruitSummary,
  RecruitCursorData,
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';
import type { RecruitsPageRouteQuery } from '~/utils/client-routes/recruits';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis/constants';
import { publicAxios } from '~/utils';

export type GetRecruitsParams = Partial<
  RecruitsPageRouteQuery & InfiniteParams
>;

export type GetRecruitsApiData = ApiSuccessResponse<
  { recruits: RecruitSummary[] } & RecruitCursorData
>;

export interface GetRecruitsQueryParams extends InfiniteParams {
  category?: RecruitCategoryName;
  keyword?: string;
  isFinished?: boolean;
  recruitTypes?: RecruitParts | RecruitParts[];
  skills?: SkillName | SkillName[];
}

export const getRecruits = (params: GetRecruitsParams = {}) => {
  const {
    size = defaultRecruitsPageSize,
    cursor = defaultRecruitsPageCursor,
    category,
    includeCompleted = false,
    recruitParts,
    skills,
    keyword,
  } = params;

  const endpoint = endpoints.recruit.list();
  const queryParams: GetRecruitsQueryParams = {
    size,
    cursor,
    category,
    isFinished: includeCompleted,
    recruitTypes: recruitParts,
    skills,
    keyword,
  };

  return publicAxios<GetRecruitsApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
