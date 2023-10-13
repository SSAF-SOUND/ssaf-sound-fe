import { useMutation } from '@tanstack/react-query';

import { updateTrack } from '~/services/member/apis';

export const useUpdateTrack = () => {
  return useMutation({
    mutationFn: updateTrack,
  });
};
