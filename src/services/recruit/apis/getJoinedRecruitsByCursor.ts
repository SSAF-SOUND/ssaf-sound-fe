import type { InfiniteParams } from '~/services/common';
import type {
  GetRecruitsByCursorApiData,
  RecruitCategoryName,
} from '~/services/recruit';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { publicAxios } from '~/utils';

export interface GetJoinedRecruitsByCursorParams {
  userId: number;
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export type GetJoinedRecruitsByCursorApiData = GetRecruitsByCursorApiData;

export interface GetJoinedRecruitsByCursorQueryParams extends InfiniteParams {
  memberId: number;
  category?: RecruitCategoryName;
}

export const getJoinedRecruitsByCursor = (params: GetJoinedRecruitsByCursorParams) => {
  const {
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
    category,
    userId,
  } = params;

  const endpoint = endpoints.recruit.joinedListByCursor();
  const queryParams: GetJoinedRecruitsByCursorQueryParams = {
    memberId: userId,
    category,
    cursor,
    size,
  };

  return publicAxios<GetJoinedRecruitsByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
