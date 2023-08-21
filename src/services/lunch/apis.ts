import type { LunchMenusWithPollStatus } from '~/services/lunch/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface GetLunchMenusWithPollStatus {
  campus: string;
  date: string;
}

export type GetLunchMenusWithPollStatusApiData =
  ApiSuccessResponse<LunchMenusWithPollStatus>;

export const getLunchMenusWithPollStatus = (
  params: GetLunchMenusWithPollStatus
) => {
  const { campus, date } = params;

  const endpoint = endpoints.lunch.list({ campus, date });

  return privateAxios
    .get<GetLunchMenusWithPollStatusApiData>(endpoint)
    .then((res) => res.data.data);
};

export const pollLunchMenu = (lunchId: number) => {
  const endpoint = endpoints.lunch.vote(lunchId);

  return privateAxios.post(endpoint).then((res) => res.data);
};

export const revertPolledLunchMenu = (lunchId: number) => {
  const endpoint = endpoints.lunch.revertVote(lunchId);

  return privateAxios.post(endpoint).then((res) => res.data);
};
