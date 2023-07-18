import { css } from '@emotion/react';

import { TextInput } from '~/components/Common';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';

const fieldName = 'questionToApplicants';
const maxLength = 50;
const validateQuestionToApplicants = (value: string) => {
  if (value.length > maxLength) {
    return `질문은 ${maxLength}자 이하로 작성할 수 있습니다.`;
  }
};

interface QuestionToApplicantsProps {
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

export const QuestionToApplicants = (props: QuestionToApplicantsProps) => {
  const { disabled, readonly, className } = props;
  const {
    register,
    formState: {
      defaultValues: { questionToApplicants: defaultQuestionToApplicants } = {},
    },
  } = useRecruitFormContext();

  return (
    <div className={className}>
      {readonly ? (
        <TextInput
          css={inputCss}
          size="md"
          value={defaultQuestionToApplicants}
          disabled={disabled}
        />
      ) : (
        <TextInput
          defaultValue={defaultQuestionToApplicants}
          css={inputCss}
          size="md"
          placeholder="질문을 작성해주세요"
          {...register(fieldName, {
            validate: validateQuestionToApplicants,
          })}
          disabled={disabled}
        />
      )}
    </div>
  );
};

const inputCss = css({
  width: '100%',
});
