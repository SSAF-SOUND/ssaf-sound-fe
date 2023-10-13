import type { InfiniteParams } from '~/services/common';
import type { GetRecruitsApiData } from '~/services/recruit';
import type { RecruitCategoryName } from '~/services/recruit/utils';

import { endpoints } from '~/react-query/common';
import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit';
import { privateAxios } from '~/utils';

export interface GetMyScrapedRecruitsParams {
  category?: RecruitCategoryName;
  cursor?: number;
  size?: number;
}

export interface GetMyScrapedRecruitsQueryParams extends InfiniteParams {
  category?: RecruitCategoryName;
}

export type GetMyScrapedRecruitsApiData = GetRecruitsApiData;

export const getMyScrapedRecruits = (
  params: GetMyScrapedRecruitsParams = {}
) => {
  const {
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;

  const endpoint = endpoints.recruit.myScraped();
  const queryParams: GetMyScrapedRecruitsQueryParams = {
    category,
    size,
    cursor,
  };

  return privateAxios<GetMyScrapedRecruitsApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
