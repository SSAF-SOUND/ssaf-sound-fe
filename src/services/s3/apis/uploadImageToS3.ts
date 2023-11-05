import type { PreparedUrls } from '~/services/s3/utils';

import { publicAxios } from '~/utils/axios';

export interface UploadImageToS3Params {
  url: string;
  file: File;
}

export type UploadImageToS3ApiData = PreparedUrls;

export const uploadImageToS3 = (params: UploadImageToS3Params) => {
  const { url, file } = params;

  return publicAxios
    .put<UploadImageToS3ApiData>(url, file, {
      baseURL: '',
    })
    .then((res) => res.data);
};
