import type { RecruitFormValues } from './type';

import { useFormContext } from 'react-hook-form';

export const useRecruitFormContext = () => {
  return useFormContext<RecruitFormValues>();
};
