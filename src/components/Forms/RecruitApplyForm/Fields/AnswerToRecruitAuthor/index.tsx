import type { RecruitCategoryName } from '~/services/recruit';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common';
import { RecruitApplyFormFieldTitle } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormFieldTitle';
import {
  recruitApplyFormFieldOrder,
  useRecruitApplyFormContext,
} from '~/components/Forms/RecruitApplyForm/utils';
import { fontCss, palettes } from '~/styles/utils';

const maxLength = 500;
const fieldName = 'answerToRecruitAuthor';
const validateAnswerToRecruitAuthor = (value: string) => {
  const { length } = value;

  return length <= maxLength || '답변은 500자 이하로 작성해야 합니다.';
};

interface AnswerToRecruitAuthorProps {
  question: string;
  category: RecruitCategoryName;
  readonly?: boolean;
}

export const AnswerToRecruitAuthor = (props: AnswerToRecruitAuthorProps) => {
  const { question, category, readonly = false } = props;
  const fieldOrder = recruitApplyFormFieldOrder.answerToRecruitAuthor[category];
  const {
    register,
    formState: {
      defaultValues: {
        answerToRecruitAuthor: defaultAnswerToRecruitAuthor = '',
      } = {},
    },
  } = useRecruitApplyFormContext();

  return (
    <div>
      <div css={marginCss}>
        <RecruitApplyFormFieldTitle>
          {fieldOrder}. [등록자 질문] {question}
        </RecruitApplyFormFieldTitle>
        {!readonly && <div css={constrainCss}>(글자 수 {maxLength}자 내)</div>}
      </div>

      <ErrorMessage
        name={fieldName}
        render={({ message }) => (
          <AlertText css={[marginCss, constrainCss]}>{message}</AlertText>
        )}
      />

      {readonly ? (
        <div css={readonlyTextareaCss}>{defaultAnswerToRecruitAuthor}</div>
      ) : (
        <textarea
          defaultValue={defaultAnswerToRecruitAuthor}
          css={textareaCss}
          placeholder="답변을 작성해주세요"
          {...register(fieldName, {
            validate: validateAnswerToRecruitAuthor,
          })}
        />
      )}
    </div>
  );
};
const marginCss = css({ marginBottom: 10 });
const constrainCss = css(fontCss.style.R12);
const textareaCss = css(
  {
    resize: 'none',
    width: '100%',
    height: 180,
    borderRadius: 8,
    padding: '12px 20px',
    color: palettes.black,
    backgroundColor: palettes.white,
  },
  fontCss.style.R14
);

const readonlyTextareaCss = css(textareaCss, {
  backgroundColor: palettes.background.grey,
  color: palettes.white,
  minHeight: 180,
  height: 'auto',
  wordBreak: 'break-word',
});
