import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common/AlertText';
import { TextInput } from '~/components/Common/TextInput';
import { recruitFormExpandCss } from '~/components/Forms/RecruitForm/Common/recruitFormExpandCss';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { fontCss, palettes } from '~/styles/utils';

const fieldName = 'questionToApplicants';
const maxLength = 50;
const validateQuestionToApplicants = (value: string) => {
  if (value.length > maxLength) {
    return `질문은 ${maxLength}자 이하로 작성할 수 있습니다.`;
  }
  return true;
};

interface QuestionToApplicantsProps {
  editMode?: boolean;
  className?: string;
}

export const QuestionToApplicants = (props: QuestionToApplicantsProps) => {
  const { editMode, className } = props;
  const {
    register,
    formState: {
      defaultValues: { questionToApplicants: defaultQuestionToApplicants } = {},
    },
  } = useRecruitFormContext();

  return (
    <div className={className}>
      <div css={titleCss}>
        <strong css={{ color: palettes.primary.default }}>[등록자 질문]</strong>{' '}
        <span>신청자에게 꼭 물어보고 싶은 질문을 적어주세요 (선택)</span>
      </div>

      {editMode ? (
        <>
          <AlertText css={{ marginBottom: 12 }}>
            등록자 질문은 변경이 불가능합니다. 추가적인 질문 사항은 Contact
            Link를 이용해주세요!
          </AlertText>
          <TextInput
            css={inputCss}
            size="md"
            value={defaultQuestionToApplicants}
            disabled
          />
        </>
      ) : (
        <>
          <p css={descriptionCss}>
            {`질문을 작성하여 리쿠르팅 참여자에게 답변을 받을 수 있습니다. (글자 수 ${maxLength}자 내)`}
          </p>
          <TextInput
            autoComplete="off"
            defaultValue={defaultQuestionToApplicants}
            css={inputCss}
            size="md"
            placeholder="질문을 작성해주세요"
            {...register(fieldName, {
              validate: validateQuestionToApplicants,
              setValueAs: (value) => value.trim(),
            })}
          />
        </>
      )}

      <ErrorMessage
        name={fieldName}
        render={({ message }) => <AlertText>{message}</AlertText>}
      />
    </div>
  );
};

const titleCss = css(recruitFormExpandCss, {
  padding: '12px 25px',
  backgroundColor: palettes.background.grey,
  marginBottom: 10,
});

const descriptionCss = css(
  { color: palettes.primary.light, marginBottom: 10 },
  fontCss.style.R12
);

const inputCss = css({
  width: '100%',
});
