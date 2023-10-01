import type { PreparedUrls } from '~/services/s3/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type CreatePreSignedUrlApiData = ApiSuccessResponse<PreparedUrls>;

export const createPreSignedUrl = () => {
  const endpoint = endpoints.s3.preSignedUrl();

  return privateAxios
    .post<CreatePreSignedUrlApiData>(endpoint)
    .then((res) => res.data.data);
};
