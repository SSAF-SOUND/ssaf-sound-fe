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

export const getJoinedRecruits = (params: GetJoinedRecruitsParams) => {
  const {
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
    category,
    userId,
  } = params;
  const endpoint = endpoints.recruit.joinedList({
    category,
    cursor,
    size,
    memberId: userId,
  });

  return publicAxios
    .get<GetJoinedRecruitsApiData>(endpoint)
    .then((res) => res.data.data);
};
