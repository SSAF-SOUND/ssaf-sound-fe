import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface GetRecruitDetailData {
  // /recruit
  // 나중에 공통되는 타입들을 정리하려고 합니다!
  // 날짜 관련은 YY-MM-DD 스트링으로 주신다고 하셔서, string으로 갔습니다
  category: 'study' | 'project';
  title: string;
  recruitStart: string;
  recruitEnd: string;
  content: string;
  created_at: string;
  modified_at: string;
  deleted_recruit: boolean;
  finished_recruit: boolean;
  view: number;
  skills: {
    skillId: number;
    name: string;
  }[];
  limits: {
    recruitType: '기획/디자인' | '프론트엔드' | '백엔드';
    limit: number;
  }[];
}

export type GetRecruitDetailApiData = ApiSuccessResponse<GetRecruitDetailData>;

export const getRecruitDetail = () => {
  const endpoint = endpoints.recruit.detail();
  return privateAxios.get<GetRecruitDetailApiData>(endpoint).then((res) => res);
};
