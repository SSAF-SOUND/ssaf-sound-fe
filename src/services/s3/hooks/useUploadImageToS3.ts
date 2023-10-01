import { useMutation } from '@tanstack/react-query';

import { uploadImageToS3 } from '~/services/s3/apis';

export const useUploadImageToS3 = () => {
  return useMutation({
    mutationFn: uploadImageToS3,
    onError: (error) => {
      console.error('[In useUploadImageToS3]:', error);
    },
  });
};
