import type { PaginationParams } from '~/services/common';
import type { GetRecruitsByOffsetApiData } from '~/services/recruit';
import type { RecruitCategoryName } from '~/services/recruit/utils';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageOffset,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { privateAxios } from '~/utils';

export interface GetMyScrapedRecruitsByOffsetParams {
  category?: RecruitCategoryName;
  page?: number;
  size?: number;
}

export interface GetMyScrapedRecruitsByOffsetQueryParams
  extends PaginationParams {
  category?: RecruitCategoryName;
}

export type GetMyScrapedRecruitsByOffsetApiData = GetRecruitsByOffsetApiData;

export const getMyScrapedRecruitsByOffset = (
  params: GetMyScrapedRecruitsByOffsetParams = {}
) => {
  const {
    category,
    page = defaultRecruitsPageOffset,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.myScrapsByOffset();
  const queryParams: GetMyScrapedRecruitsByOffsetQueryParams = {
    category,
    size,
    page,
  };

  return privateAxios<GetMyScrapedRecruitsByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
