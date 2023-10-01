import type { CampusInfo } from '~/services/meta/utils';
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
