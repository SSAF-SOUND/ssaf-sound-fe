import type {
  LimitType,
  RecruitCategoryType,
  RecruitType,
  SkillsType,
} from './utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface RecruitDetailParams {
  category: RecruitCategoryType;
  title: string;
  recruitStart: string;
  recruitEnd: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  deletedRecruit: boolean;
  finishedRecruit: boolean;
  view: number;
  skills: SkillsType[];
  limits: LimitType[];
}

export type GetRecruitDetailApiData = ApiSuccessResponse<RecruitDetailParams>;

export const getRecruitDetail = () => {
  const endpoint = endpoints.recruit.detail();
  return privateAxios.get<GetRecruitDetailApiData>(endpoint).then((res) => res);
};
