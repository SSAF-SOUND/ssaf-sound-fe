import { mockCreatePreSignedUrl } from '~/mocks/handlers/s3/apis/mockCreatePreSignedUrl';
import { mockUploadImageToS3 } from '~/mocks/handlers/s3/apis/mockUploadImageToS3';

export const s3Handlers = [mockCreatePreSignedUrl, mockUploadImageToS3];
