import type { StudentCertificationFormValues } from '~/components/Forms/StudentCertificationForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { AlertText, Button, TextInput } from '~/components/Common';
import { useStudentCertificationFormContext } from '~/components/Forms/StudentCertificationForm/utils';

const fieldName = 'answer';
const maxLength = 20;

interface AnswerProps {
  fieldId: string;
  className?: string;
}

const Answer = (props: AnswerProps) => {
  const { fieldId, className } = props;
  const {
    register,
    formState: { isSubmitting, errors },
  } = useStudentCertificationFormContext();

  const answer = useWatch<StudentCertificationFormValues>({
    name: fieldName,
  }) as string | undefined;

  return (
    <div className={className}>
      <div>
        <TextInput
          css={textInputCss}
          id={fieldId}
          size="lg"
          placeholder="단어를 입력해주세요"
          autoComplete="off"
          {...register(fieldName, {
            required: true,
            maxLength: {
              value: maxLength,
              message: `정답은 ${maxLength}자 이하로만 작성할 수 있습니다.`,
            },
          })}
        />

        {errors?.answer?.message && (
          <AlertText size="sm">{errors.answer.message}</AlertText>
        )}
      </div>

      <Button
        css={buttonCss}
        size="lg"
        loading={isSubmitting}
        disabled={!answer?.length}
        type="submit"
      >
        확인
      </Button>
    </div>
  );
};

export default Answer;

const textInputCss = css({ width: '100%' });
const buttonCss = css({ width: '100%' });
