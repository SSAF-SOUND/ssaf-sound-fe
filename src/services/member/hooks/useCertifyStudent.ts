import { useMutation } from '@tanstack/react-query';

import { certifyStudent } from '~/services/member/apis';

export const useCertifyStudent = () => {
  return useMutation({
    mutationFn: certifyStudent,
  });
};
