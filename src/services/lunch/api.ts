import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios, publicAxiosWithError } from '~/utils';

export interface LunchMenus {
  totalPollCount: number;
  polledAt: number;
  menus: LunchMenu[];
}

export interface LunchMenu {
  mainMenu: string;
  imagePath: string;
  pollCount: number;
}

export interface LunchMenuDetail {
  mainMenu: string;
  extraMenu: string;
  sumKcal: string;
}

export interface getMenusParams {
  // 추후 수정
  campus: '서울' | '경기';
  date: string;
}

export const getLunchMenus = (params: getMenusParams) => {
  const { campus, date } = params;

  const endPoint = endpoints.lunch.menus({
    campus,
    date,
  });

  return publicAxiosWithError
    .get<GetLunchMenusApiData>(endPoint)
    .then((res) => res.data);
};

export const getLunchMenusError = () => {
  const endPoint = endpoints.lunch.error();

  return publicAxiosWithError
    .get<GetLunchMenusApiData>(endPoint)
    .then((res) => res.data);
};
export type GetLunchMenusApiData = ApiSuccessResponse<LunchMenus>;

export const getLunchDetail = (lunchId: number) => {
  const endPoint = endpoints.lunch.detail(lunchId);

  return publicAxios
    .get<GetLunchDetailApiData>(endPoint)
    .then((res) => res.data.data);
};

export type GetLunchDetailApiData = ApiSuccessResponse<LunchMenuDetail>;

export const postLunchMenuVote = (lunchId: number) => {
  const endPoint = endpoints.lunch.vote(lunchId);
  const body = {
    lunchId,
    // access 토근
  };

  return privateAxios
    .post<ApiSuccessResponse<{ lunchId: number }>>(endPoint, body)
    .then((res) => res.data.data.lunchId);
};

export const poetRevertLunchMenuVote = (lunchId: number) => {
  const endPoint = endpoints.lunch.revertVote(lunchId);
  const body = {
    lunchId,
    // access 토근
  };

  return privateAxios
    .post<ApiSuccessResponse<{ lunchId: number }>>(endPoint, body)
    .then((res) => res.data.data.lunchId);
};
