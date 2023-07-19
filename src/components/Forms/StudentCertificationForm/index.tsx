import type { StudentCertificationFormValues } from './utils';
import type { SubmitHandler } from 'react-hook-form';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { useStack } from '~/hooks';
import { flex, pageMinHeight } from '~/styles/utils';
import { noop } from '~/utils';

import { Quiz, Track } from './Fields';

interface StudentCertificationFormProps {
  onSubmit?: SubmitHandler<StudentCertificationFormValues>;
  defaultValues?: Partial<StudentCertificationFormValues>;
  className?: string;
}

const StudentCertificationForm = (props: StudentCertificationFormProps) => {
  const {
    onSubmit = noop,
    defaultValues = defaultStudentCertificationFormValues,
    className,
  } = props;
  const methods = useForm<StudentCertificationFormValues>({
    defaultValues,
  });

  const {
    push: pushPhase,
    pop: popPhase,
    top: currentPhase,
  } = useStack([0], { defaultTop: 0 });

  const FieldComponents = useMemo(() => {
    return [
      () => <Track onSelect={() => pushPhase(currentPhase + 1)} />,
      () => <Quiz />,
    ];
  }, [pushPhase, currentPhase]);

  const FieldComponent = FieldComponents[currentPhase];

  return (
    <div css={selfCss} className={className}>
      <FormProvider {...methods}>
        <TitleBar.Default
          title="SSAFY 재학생 인증"
          withoutBackward={currentPhase === 0}
          withoutClose
          onClickBackward={popPhase}
        />
        <form onSubmit={methods.handleSubmit(onSubmit)} css={formCss}>
          <FieldComponent />
        </form>
      </FormProvider>
    </div>
  );
};

const defaultStudentCertificationFormValues: Partial<StudentCertificationFormValues> =
  {
    answer: '',
    year: undefined,
    track: undefined,
  };

export default StudentCertificationForm;

const selfCss = css({ minHeight: pageMinHeight }, flex());

const formCss = css(
  {
    flexGrow: 1,
  },
  flex()
);
