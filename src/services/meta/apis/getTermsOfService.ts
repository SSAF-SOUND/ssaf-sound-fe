import type { Term } from '~/services/meta/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';

export type GetTermsOfServiceApiData = ApiSuccessResponse<{
  termElements: Term[];
}>;

export const getTermsOfService = () => {
  const endpoint = endpoints.meta.termsOfService();

  return publicAxios
    .get<GetTermsOfServiceApiData>(endpoint)
    .then((res) => res.data.data.termElements);
};
