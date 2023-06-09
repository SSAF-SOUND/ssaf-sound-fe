import { css } from '@emotion/react';

import { TextInput } from '~/components/Common';
import { useRecruitFormContext } from '~/components/RecruitForm/utils';

const fieldName = 'contact';
const maxLength = 500;

const validateContact = (value: string) => {
  if (value.length > maxLength) {
    return `연락처의 길이는 ${maxLength}자 이하여야 합니다.`;
  }
};

interface ContactProps {
  className?: string;
}

export const Contact = (props: ContactProps) => {
  const { className } = props;
  const {
    register,
    formState: { defaultValues: { contact: defaultContact } = {} },
  } = useRecruitFormContext();

  return (
    <div className={className}>
      <TextInput
        size="md"
        placeholder="링크를 입력해주세요"
        css={inputCss}
        defaultValue={defaultContact}
        {...register(fieldName, {
          validate: validateContact,
        })}
      />
    </div>
  );
};

const inputCss = css({
  width: '100%',
});
