import type { CreatePreSignedUrlApiData } from '~/services/s3';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

import { imageDir, preSignedUrl } from './data';

export const createPreSignedUrl = restSuccess<
  CreatePreSignedUrlApiData['data']
>(
  'post',
  composeUrls(API_URL, removeQueryParams(endpoints.s3.preSignedUrl())),
  {
    data: {
      imagePathDtos: [
        {
          preSignedUrl,
          imageDir,
        },
      ],
    },
    delay: 1000,
  }
);

export const createPreSignedUrlError = restError(
  'post',
  composeUrls(API_URL, removeQueryParams(endpoints.s3.preSignedUrl())),
  {
    data: null,
  }
);

// preSignedUrl 자체가 Absolute path이기 때문에, API_URL을 prefix로 사용하지 않음
export const uploadImageToS3 = restSuccess('put', preSignedUrl, {
  data: null,
  delay: 1000,
});

export const uploadImageToS3Error = restError('put', preSignedUrl, {
  data: null,
});

export const s3Handlers = [createPreSignedUrl, uploadImageToS3];
