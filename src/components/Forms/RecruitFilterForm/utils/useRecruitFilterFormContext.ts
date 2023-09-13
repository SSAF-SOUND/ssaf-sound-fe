import type { RecruitFilterFormValues } from './types';

import { useFormContext } from 'react-hook-form';

export const useRecruitFilterFormContext = () => {
  return useFormContext<RecruitFilterFormValues>();
};
