import { useMutation } from '@tanstack/react-query';

import { createPreSignedUrl } from '~/services/s3/apis';

export const useCreatePreSignedUrl = () => {
  return useMutation({
    mutationFn: createPreSignedUrl,
    onError: (error) => {
      console.error('[In useCreatePreSignedUrl]:', error);
    },
  });
};
