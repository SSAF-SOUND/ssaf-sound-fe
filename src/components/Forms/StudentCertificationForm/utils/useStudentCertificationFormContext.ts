import type { StudentCertificationFormValues } from './types';

import { useFormContext } from 'react-hook-form';

export const useStudentCertificationFormContext = () => {
  return useFormContext<StudentCertificationFormValues>();
};
