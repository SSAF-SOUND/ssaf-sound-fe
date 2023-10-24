import type { PaginationParams, PaginationStatus } from '~/services/common';
import type {
  RecruitSummary,
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';
import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

import { endpoints } from '~/react-query/common';
import { defaultRecruitsPageOffset } from '~/services/recruit';
import { defaultRecruitsPageSize } from '~/services/recruit/apis/constants';
import { privateAxios, publicAxios } from '~/utils';

export type GetRecruitsByOffsetParams = Partial<
  RecruitsListPageRouteQuery & { size?: number }
>;

export type GetRecruitsByOffsetApiData = ApiSuccessResponse<
  { recruits: RecruitSummary[] } & PaginationStatus
>;

export interface GetRecruitsByOffsetQueryParams extends PaginationParams {
  category?: RecruitCategoryName;
  keyword?: string;
  isFinished?: boolean;
  recruitTypes?: RecruitParts | RecruitParts[];
  skills?: SkillName | SkillName[];
}

export interface GetRecruitsByOffsetOptions {
  publicRequest?: boolean;
}

export const getRecruitsByOffset = (
  params: GetRecruitsByOffsetParams = {},
  options: GetRecruitsByOffsetOptions = {}
) => {
  const {
    size = defaultRecruitsPageSize,
    page = defaultRecruitsPageOffset,
    category,
    includeCompleted = false,
    recruitParts,
    skills,
    keyword,
  } = params;
  const { publicRequest } = options;

  const endpoint = endpoints.recruit.listByOffset();
  const queryParams: GetRecruitsByOffsetQueryParams = {
    size,
    page,
    category,
    isFinished: includeCompleted,
    recruitTypes: recruitParts,
    skills,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetRecruitsByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
