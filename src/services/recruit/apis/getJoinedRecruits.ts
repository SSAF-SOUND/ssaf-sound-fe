import type { InfiniteParams } from '~/services/common';
import type {
  GetRecruitsApiData,
  RecruitCategoryName,
} from '~/services/recruit';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { publicAxios } from '~/utils';

export interface GetJoinedRecruitsParams {
  userId: number;
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export type GetJoinedRecruitsApiData = GetRecruitsApiData;

export interface GetJoinedRecruitsQueryParams extends InfiniteParams {
  memberId: number;
  category?: RecruitCategoryName;
}

export const getJoinedRecruits = (params: GetJoinedRecruitsParams) => {
  const {
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
    category,
    userId,
  } = params;

  const endpoint = endpoints.recruit.joinedList();
  const queryParams: GetJoinedRecruitsQueryParams = {
    memberId: userId,
    category,
    cursor,
    size,
  };

  return publicAxios<GetJoinedRecruitsApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
