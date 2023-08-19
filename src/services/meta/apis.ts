import type { CampusInfo } from './utils';
import type { RecruitType } from '../recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils';

export type GetCampusesApiData = ApiSuccessResponse<CampusInfo[]>;

export const getCampuses = () => {
  const endpoint = endpoints.meta.campuses();
  return publicAxios
    .get<GetCampusesApiData>(endpoint)
    .then((res) => res.data.data);
};

interface RecruitTypesMeta {
  name: string;
  id: number;
}

export type GetRecruitTypesApiData = ApiSuccessResponse<{
  recruitTypes: RecruitTypesMeta[];
}>;

export const getRecruitTypes = () => {
  const endpoint = endpoints.meta.recruitTypes();
  return publicAxios
    .get<GetRecruitTypesApiData>(endpoint)
    .then((res) => res.data.data);
};
