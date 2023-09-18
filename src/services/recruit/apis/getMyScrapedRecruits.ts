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

export type GetMyScrapedRecruitsApiData = GetRecruitsApiData;

export const getMyScrapedRecruits = (
  params: GetMyScrapedRecruitsParams = {}
) => {
  const {
    category,
    cursor = defaultRecruitsPageCursor,
    size = defaultRecruitsPageSize,
  } = params;
  const endpoint = endpoints.recruit.myScraped({ category, size, cursor });
  return privateAxios
    .get<GetMyScrapedRecruitsApiData>(endpoint)
    .then((res) => res.data.data);
};
