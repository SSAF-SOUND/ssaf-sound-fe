import type { CreatePreSignedUrlApiData } from '~/services/s3';

import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

import { imageDir, preSignedUrl } from './data';

export const createPreSignedUrl = restSuccess<
  CreatePreSignedUrlApiData['data']
>('post', composeUrls(API_URL, endpoints.s3.preSignedUrl()), {
  data: {
    imagePathDtos: [
      {
        preSignedUrl,
        imageDir,
      },
    ],
  },
});

// preSignedUrl 자체가 Absolute path이기 때문에, API_URL을 prefix로 사용하지 않음
export const uploadImageToS3 = restSuccess('put', preSignedUrl, {
  data: null,
});

export const s3Handlers = [createPreSignedUrl, uploadImageToS3];
