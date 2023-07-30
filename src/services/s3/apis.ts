import type { PreparedUrls } from '~/services/s3/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type CreatePreSignedUrlApiData = ApiSuccessResponse<PreparedUrls>;

export const createPreSignedUrl = () => {
  const endpoint = endpoints.s3.preSignedUrl();
  return privateAxios
    .post<CreatePreSignedUrlApiData>(endpoint)
    .then((res) => res.data.data);
};

interface UploadImageToS3Params {
  url: string;
  file: File;
}

export const uploadImageToS3 = (params: UploadImageToS3Params) => {
  const { url, file } = params;

  return publicAxios
    .put(url, file, {
      headers: {
        'Content-Type': 'image/webp',
      },
      baseURL: '',
    })
    .then((res) => res.data) as Promise<PreparedUrls>;
};
