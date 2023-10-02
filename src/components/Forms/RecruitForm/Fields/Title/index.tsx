import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common/AlertText';
import { TextInput } from '~/components/Common/TextInput';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { fontCss, palettes } from '~/styles/utils';

const fieldName = 'title';
const minTitleLength = 2;
const maxTitleLength = 30;
const validateTitle = (value: string) => {
  const { length } = value;
  if (length < minTitleLength || value.length > maxTitleLength) {
    return `제목은 ${minTitleLength}자 이상, ${maxTitleLength}자 이하여야 합니다.`;
  }
};

interface TitleProps {
  className?: string;
}

export const Title = (props: TitleProps) => {
  const { className } = props;

  const {
    register,
    formState: { defaultValues: { title: defaultTitle } = {} },
  } = useRecruitFormContext();

  return (
    <div css={selfCss} className={className}>
      <TextInput
        size="md"
        css={inputCss}
        placeholder="리쿠르팅 제목"
        defaultValue={defaultTitle}
        {...register(fieldName, {
          validate: validateTitle,
        })}
      />
      <ErrorMessage
        name={fieldName}
        render={({ message }) => {
          return <AlertText css={errorMessageCss}>{message}</AlertText>;
        }}
      />
    </div>
  );
};

const selfCss = css({
  backgroundColor: palettes.white,
  border: `1px solid ${palettes.grey3}`,
  borderBottom: 0,
});

const inputCss = css(
  {
    width: '100%',
    border: 0,
    borderRadius: 0,
    outline: 0,
    '&:focus': {},
  },
  fontCss.style.R18
);

const errorMessageCss = css({
  padding: `0 16px 8px`,
});
