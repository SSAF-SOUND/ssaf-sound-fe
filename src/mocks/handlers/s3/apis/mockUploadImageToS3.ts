import { preSignedUrl } from '~/mocks/handlers/s3/data';
import { restError, restSuccess } from '~/mocks/utils';

const uploadImageToS3Method = 'put';
const uploadImageToS3Endpoint = preSignedUrl;

export const mockUploadImageToS3 = restSuccess(
  uploadImageToS3Method,
  uploadImageToS3Endpoint,
  {
    data: null,
    delay: 500,
  }
);

export const mockUploadImageToS3Error = restError(
  uploadImageToS3Method,
  uploadImageToS3Endpoint,
  {
    data: null,
  }
);
