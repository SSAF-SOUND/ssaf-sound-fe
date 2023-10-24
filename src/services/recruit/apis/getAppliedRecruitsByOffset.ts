import type { PaginationParams, PaginationStatus } from '~/services/common';
import type { AppliedRecruitSummary } from '~/services/recruit/apis';
import type {
  RecruitCategoryName,
  MatchStatus,
} from '~/services/recruit/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis';
import { privateAxios } from '~/utils/axios';

export interface GetAppliedRecruitsByOffsetParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
  page?: number;
  size?: number;
}

export interface GetAppliedRecruitsByOffsetQueryParams
  extends PaginationParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
}

export type GetAppliedRecruitsByOffsetApiData = ApiSuccessResponse<
  { recruits: AppliedRecruitSummary[] } & PaginationStatus
>;

export const getAppliedRecruitsByOffset = (
  params: GetAppliedRecruitsByOffsetParams
) => {
  const {
    matchStatus,
    category,
    page = defaultRecruitsPageOffset,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.appliedListByOffset();
  const queryParams: GetAppliedRecruitsByOffsetQueryParams = {
    matchStatus,
    category,
    page,
    size,
  };

  return privateAxios<GetAppliedRecruitsByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
