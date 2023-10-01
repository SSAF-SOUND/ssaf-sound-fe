import type { LunchMenusWithPollStatus } from '~/services/lunch/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface GetLunchMenusWithPollStatusParams {
  campus: string;
  date: string;
}

export type GetLunchMenusWithPollStatusApiData =
  ApiSuccessResponse<LunchMenusWithPollStatus>;

export const getLunchMenusWithPollStatus = (
  params: GetLunchMenusWithPollStatusParams
) => {
  const { campus, date } = params;

  const endpoint = endpoints.lunch.list({ campus, date });

  return privateAxios
    .get<GetLunchMenusWithPollStatusApiData>(endpoint)
    .then((res) => res.data.data);
};
