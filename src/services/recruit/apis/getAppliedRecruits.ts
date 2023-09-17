import type { GetRecruitsApiData } from '~/services/recruit/apis';
import type {
  RecruitCategoryName,
  MatchStatus,
} from '~/services/recruit/utils';

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

export type GetAppliedRecruitsApiData = GetRecruitsApiData;

export const getAppliedRecruits = (params: GetAppliedRecruitsParams) => {
  const {
    matchStatus,
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;
  const endpoint = endpoints.recruit.appliedList({
    category,
    matchStatus,
    cursor,
    size,
  });

  return privateAxios
    .get<GetAppliedRecruitsApiData>(endpoint)
    .then((res) => res.data.data);
};
