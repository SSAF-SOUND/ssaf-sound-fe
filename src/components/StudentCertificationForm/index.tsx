import type { StudentCertificationFormValues } from './utils';
import type { SubmitHandler } from 'react-hook-form';

import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { useStack } from '~/hooks';
import { noop } from '~/utils';

import { Quiz, Track } from './Fields';

interface StudentCertificationFormProps {
  onSubmit?: SubmitHandler<StudentCertificationFormValues>;
  defaultValues?: Partial<StudentCertificationFormValues>;
}

const StudentCertificationForm = (props: StudentCertificationFormProps) => {
  const {
    onSubmit = noop,
    defaultValues = defaultStudentCertificationFormValues,
  } = props;
  const methods = useForm<StudentCertificationFormValues>({
    defaultValues,
  });

  const { push, pop, top } = useStack([0], { defaultTop: 0 });

  const FieldComponents = useMemo(() => {
    return [() => <Track onSelect={() => push(top + 1)} />, () => <Quiz />];
  }, [push, top]);

  const FieldComponent = FieldComponents[top];

  return (
    <FormProvider {...methods}>
      <TitleBar.Default
        title="SSAFY 재학생 인증"
        withoutBackward={top === 0}
        withoutClose
        onClickBackward={pop}
      />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldComponent />
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
