import { css } from '@emotion/react';

import { TextInput } from '~/components/Common';
import { useRecruitFormContext } from '~/components/RecruitForm/utils';
import { fontCss } from '~/styles/utils';

const fieldName = 'title';
const maxTitleLength = 30;
const validateTitle = (value: string) => {
  if (!value.length) return '제목은 반드시 입력해야 합니다.';
  if (value.length > maxTitleLength) {
    return `제목의 길이는 ${maxTitleLength}자 이하여야 합니다.`;
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
    <div className={className}>
      <TextInput
        size="md"
        css={inputCss}
        placeholder="리크루팅 제목"
        defaultValue={defaultTitle}
        {...register(fieldName, {
          validate: validateTitle,
        })}
      />
    </div>
  );
};

const inputCss = css(
  {
    width: '100%',
    borderRadius: 0,
  },
  fontCss.style.R18
);
