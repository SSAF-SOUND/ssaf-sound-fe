import type { PreSignedUrl } from '~/services/s3/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type CreatePreSignedUrlApiData = ApiSuccessResponse<{
  imagePathDtos: PreSignedUrl[];
}>;

export const createPreSignedUrl = () => {
  const endpoint = endpoints.s3.preSignedUrl();
  return privateAxios
    .post<CreatePreSignedUrlApiData>(endpoint)
    .then((res) => res.data.data.imagePathDtos[0]);
};

interface UploadImageToS3Params {
  url: string;
  file: File;
}

export const uploadImageToS3 = (params: UploadImageToS3Params) => {
  const { url, file } = params;
  return publicAxios
    .put(url, file)
    .then((res) => res.data) as Promise<PreSignedUrl>;
};
