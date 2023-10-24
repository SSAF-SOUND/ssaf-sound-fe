import type { InfiniteParams } from '~/services/common';
import type {
  AppliedRecruitSummary,
  RecruitCursorData,
} from '~/services/recruit/apis';
import type {
  RecruitCategoryName,
  MatchStatus,
} from '~/services/recruit/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis';
import { privateAxios } from '~/utils';

export interface GetAppliedRecruitsByCursorParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export interface GetAppliedRecruitsByCursorQueryParams extends InfiniteParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
}

export type GetAppliedRecruitsByCursorApiData = ApiSuccessResponse<
  { recruits: AppliedRecruitSummary[] } & RecruitCursorData
>;

export const getAppliedRecruitsByCursor = (
  params: GetAppliedRecruitsByCursorParams
) => {
  const {
    matchStatus,
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.appliedListByCursor();
  const queryParams: GetAppliedRecruitsByCursorQueryParams = {
    matchStatus,
    category,
    cursor,
    size,
  };

  return privateAxios<GetAppliedRecruitsByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
