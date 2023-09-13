import type { RecruitApplyFormValues } from './types';

import { useFormContext } from 'react-hook-form';

export const useRecruitApplyFormContext = () => {
  return useFormContext<RecruitApplyFormValues>();
};
