import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateProfileVisibilityParams {
  isPublic: boolean;
}

export interface UpdateProfileVisibilityBody {
  isPublic: boolean;
}

export const updateProfileVisibility = (
  params: UpdateProfileVisibilityParams
) => {
  const endpoint = endpoints.user.profileVisibility();
  const body: UpdateProfileVisibilityBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
