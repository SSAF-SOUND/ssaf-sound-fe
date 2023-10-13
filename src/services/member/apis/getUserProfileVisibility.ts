import type { ProfileVisibility } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';

export type GetUserProfileVisibilityApiData =
  ApiSuccessResponse<ProfileVisibility>;

export const getUserProfileVisibility = (id: number) => {
  const endpoint = endpoints.user.userProfileVisibility(id);
  return publicAxios
    .get<GetUserProfileVisibilityApiData>(endpoint)
    .then((res) => res.data.data);
};
