import type { StudentCertificationFormValues } from './utils';
import type { SubmitHandler } from 'react-hook-form';
import type { SsafyTrack } from '~/services/member';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { useStack } from '~/hooks';
import { flex, pageMinHeight } from '~/styles/utils';

import { StudentCertificationFormFields } from './Fields';

interface StudentCertificationFormProps {
  onValidSubmit: SubmitHandler<StudentCertificationFormValues>;
  defaultValues?: StudentCertificationFormValues;
  className?: string;
}

const StudentCertificationForm = (props: StudentCertificationFormProps) => {
  const {
    onValidSubmit,
    defaultValues = defaultStudentCertificationFormValues,
    className,
  } = props;

  const methods = useForm<StudentCertificationFormValues>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const {
    push: pushPhase,
    pop: popPhase,
    top: currentPhase,
  } = useStack([0], { defaultTop: 0 });

  const pushNextPhase = () => pushPhase(currentPhase + 1);

  return (
    <div css={selfCss} className={className}>
      <FormProvider {...methods}>
        <TitleBar.Default
          title="SSAFY 재학생 인증"
          withoutBackward={currentPhase === 0}
          withoutClose
          onClickBackward={popPhase}
        />
        <form onSubmit={handleSubmit(onValidSubmit)} css={formCss}>
          {currentPhase === 0 && (
            <StudentCertificationFormFields.Track onSelect={pushNextPhase} />
          )}
          {currentPhase === 1 && <StudentCertificationFormFields.Quiz />}
        </form>
      </FormProvider>
    </div>
  );
};

export const defaultStudentCertificationFormValues: StudentCertificationFormValues =
  {
    answer: '',
    year: 1,
    track: undefined as unknown as SsafyTrack,
  };

export default StudentCertificationForm;

const selfCss = css({ minHeight: pageMinHeight }, flex());

const formCss = css({ flexGrow: 1 }, flex());
