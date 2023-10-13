import { useMutation } from '@tanstack/react-query';

import { updateMyInfo } from '~/services/member/apis';
import { useSetMyInfo } from '~/services/member/hooks/useSetMyInfo';

export const useUpdateMyInfo = () => {
  const setMyInfo = useSetMyInfo();

  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: (data) => setMyInfo(data),
  });
};
