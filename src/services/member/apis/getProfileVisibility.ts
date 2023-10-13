import type { ProfileVisibility } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type GetProfileVisibilityApiData = ApiSuccessResponse<ProfileVisibility>;
export const getProfileVisibility = () => {
  const endpoint = endpoints.user.profileVisibility();

  return privateAxios
    .get<GetProfileVisibilityApiData>(endpoint)
    .then((res) => res.data.data);
};
