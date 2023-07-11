import type {
  StudentCertificationFormValues} from '~/components/StudentCertificationForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { Button, TextInput } from '~/components/Common';
import {
  useStudentCertificationFormContext,
} from '~/components/StudentCertificationForm/utils';

const fieldName = 'answer';

interface AnswerProps {
  fieldId: string;
}

export const Answer = (props: AnswerProps) => {
  const { fieldId } = props;
  const {
    register,
    formState: { isSubmitting },
  } = useStudentCertificationFormContext();

  const answer = useWatch<StudentCertificationFormValues>({
    name: fieldName,
  }) as string;

  return (
    <div>
      <TextInput
        css={textInputCss}
        id={fieldId}
        size="lg"
        placeholder="단어를 입력해주세요"
        {...register(fieldName, { required: true })}
      />

      <Button
        css={buttonCss}
        size="lg"
        loading={isSubmitting}
        disabled={!answer.length}
        type="submit"
      >
        확인
      </Button>
    </div>
  );
};

const textInputCss = css({ width: '100%' });
const buttonCss = css({ width: '100%' });
