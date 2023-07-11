import type { StudentCertificationFormValues } from './utils';
import type { SubmitHandler } from 'react-hook-form';

import { FormProvider, useForm } from 'react-hook-form';

import { Answer } from './Fields';

interface StudentCertificationFormProps {
  onSubmit?: SubmitHandler<StudentCertificationFormValues>;
  defaultValues?: Partial<StudentCertificationFormValues>;
}

const StudentCertificationForm = (props: StudentCertificationFormProps) => {
  const { defaultValues = defaultStudentCertificationFormValues } = props;
  const methods = useForm<StudentCertificationFormValues>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Answer  />
      </form>
    </FormProvider>
  );
};

export default StudentCertificationForm;

const defaultStudentCertificationFormValues: Partial<StudentCertificationFormValues> =
  {
    answer: '',
    year: undefined,
    track: undefined,
  };
