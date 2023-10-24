import type { PaginationParams } from '~/services/common';
import type {
  GetRecruitsByOffsetApiData,
  RecruitCategoryName,
} from '~/services/recruit';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { publicAxios } from '~/utils';

export interface GetJoinedRecruitsByOffsetParams {
  userId: number;
  category?: RecruitCategoryName;
  page?: number;
  size?: number;
}

export type GetJoinedRecruitsByOffsetApiData = GetRecruitsByOffsetApiData;

export interface GetJoinedRecruitsByOffsetQueryParams extends PaginationParams {
  memberId: number;
  category?: RecruitCategoryName;
}

export const getJoinedRecruitsByOffset = (params: GetJoinedRecruitsByOffsetParams) => {
  const {
    page = defaultRecruitsPageOffset,
    size = defaultRecruitsPageSize,
    category,
    userId,
  } = params;

  const endpoint = endpoints.recruit.joinedListByOffset();
  const queryParams: GetJoinedRecruitsByOffsetQueryParams = {
    memberId: userId,
    category,
    page,
    size,
  };

  return publicAxios<GetJoinedRecruitsByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
