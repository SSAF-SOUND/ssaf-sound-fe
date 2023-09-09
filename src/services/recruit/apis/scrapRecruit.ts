import type { ScrapStatus } from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type ScrapRecruitApiData = ApiSuccessResponse<ScrapStatus>;

export const scrapRecruit = (recruitId: number) => {
  const endpoint = endpoints.recruit.scrap(recruitId);

  return privateAxios
    .post<ScrapRecruitApiData>(endpoint, null)
    .then((res) => res.data.data);
};
