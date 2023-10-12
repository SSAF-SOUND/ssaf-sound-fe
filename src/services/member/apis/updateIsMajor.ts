import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateIsMajorParams {
  isMajor: boolean;
}

export interface UpdateIsMajorBody {
  isMajor: boolean;
}

export const updateIsMajor = (params: UpdateIsMajorParams) => {
  const endpoint = endpoints.user.isMajor();
  const body: UpdateIsMajorBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
