import type { InfiniteParams } from '~/services/common';
import type { GetRecruitsByCursorApiData } from '~/services/recruit';
import type { RecruitCategoryName } from '~/services/recruit/utils';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { privateAxios } from '~/utils';

export interface GetMyScrapedRecruitsByCursorParams {
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export interface GetMyScrapedRecruitsByCursorQueryParams
  extends InfiniteParams {
  category?: RecruitCategoryName;
}

export type GetMyScrapedRecruitsByCursorApiData = GetRecruitsByCursorApiData;

export const getMyScrapedRecruitsByCursor = (
  params: GetMyScrapedRecruitsByCursorParams = {}
) => {
  const {
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.myScrapsByCursor();
  const queryParams: GetMyScrapedRecruitsByCursorQueryParams = {
    category,
    size,
    cursor,
  };

  return privateAxios<GetMyScrapedRecruitsByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
