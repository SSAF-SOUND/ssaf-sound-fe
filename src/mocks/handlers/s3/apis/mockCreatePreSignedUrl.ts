import type { CreatePreSignedUrlApiData } from '~/services/s3';

import { imagePath, imageUrl, preSignedUrl } from '~/mocks/handlers/s3/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const createPreSignedUrlMethod = 'post';
const createPreSignedUrlEndpoint = composeUrls(
  API_URL,
  removeQueryParams(endpoints.s3.preSignedUrl())
);

export const mockCreatePreSignedUrl = restSuccess<
  CreatePreSignedUrlApiData['data']
>(createPreSignedUrlMethod, createPreSignedUrlEndpoint, {
  data: {
    preSignedUrl,
    imageUrl,
    imagePath,
  },
  delay: 500,
});

export const mockCreatePreSignedUrlError = restError(
  createPreSignedUrlMethod,
  createPreSignedUrlEndpoint,
  {
    message: 'mockCreatePreSignedUrl Error',
  }
);
