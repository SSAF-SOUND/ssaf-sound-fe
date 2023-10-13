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

export interface GetAppliedRecruitsParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export interface GetAppliedRecruitsQueryParams extends InfiniteParams {
  matchStatus?: MatchStatus;
  category?: RecruitCategoryName;
}

export type GetAppliedRecruitsApiData = ApiSuccessResponse<
  { recruits: AppliedRecruitSummary[] } & RecruitCursorData
>;

export const getAppliedRecruits = (params: GetAppliedRecruitsParams) => {
  const {
    matchStatus,
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.appliedList();
  const queryParams: GetAppliedRecruitsQueryParams = {
    matchStatus,
    category,
    cursor,
    size,
  };

  return privateAxios<GetAppliedRecruitsApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
