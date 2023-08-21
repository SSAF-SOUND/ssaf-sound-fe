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

// export const getLunchMenusError = () => {
//   const endPoint = endpoints.lunch.error();
//
//   return publicAxiosWithError
//     .get<GetLunchMenusApiData>(endPoint)
//     .then((res) => res.data);
// };
// export type GetLunchMenusApiData = ApiSuccessResponse<LunchMenuSummaries>;
//
// export const getLunchDetail = (lunchId: number) => {
//   const endPoint = endpoints.lunch.detail(lunchId);
//
//   return publicAxios
//     .get<GetLunchDetailApiData>(endPoint)
//     .then((res) => res.data.data);
// };
//
// export type GetLunchDetailApiData = ApiSuccessResponse<LunchMenuDetail>;
//
// export const postLunchMenuVote = (lunchId: number) => {
//   const endPoint = endpoints.lunch.vote(lunchId);
//   const body = {
//     lunchId,
//     // access 토근
//   };
//
//   return privateAxios
//     .post<ApiSuccessResponse<{ lunchId: number }>>(endPoint, body)
//     .then((res) => res.data.data.lunchId);
// };
//
// export const poetRevertLunchMenuVote = (lunchId: number) => {
//   const endPoint = endpoints.lunch.revertVote(lunchId);
//   const body = {
//     lunchId,
//     // access 토근
//   };
//
//   return privateAxios
//     .post<ApiSuccessResponse<{ lunchId: number }>>(endPoint, body)
//     .then((res) => res.data.data.lunchId);
// };
