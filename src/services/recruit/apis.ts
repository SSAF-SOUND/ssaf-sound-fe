import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface GetRecruitDetailData {
  // /recruit
  // 임시
  category: 'study' | 'project';
  title: string;
  recruitStart: Date;
  recruitEnd: Date;
  content: string;
  created_at: Date;
  modified_at: Date;
  deleted_recruit: boolean;
  finished_recruit: boolean;
  view: number;
}

export type GetRecruitDetailApiData = ApiSuccessResponse<GetRecruitDetailData>;

export const getRecruitDetail = () => {
  const endpoint = endpoints.recruit.detail();
  return privateAxios.get<GetRecruitDetailApiData>(endpoint).then((res) => res);
};
