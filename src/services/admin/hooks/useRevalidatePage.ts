import type { RevalidatePageBody } from '~/services/admin/apis/revalidatePage';

import { useMutation } from '@tanstack/react-query';

import { revalidatePage } from '~/services/admin/apis/revalidatePage';

export interface UseRevalidatePageParams extends RevalidatePageBody {}

export const useRevalidatePage = () => {
  return useMutation({
    mutationFn: (params: UseRevalidatePageParams) => revalidatePage(params),
  });
};
