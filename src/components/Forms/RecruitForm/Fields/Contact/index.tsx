import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common/AlertText';
import { TextInput } from '~/components/Common/TextInput';
import { recruitFormExpandCss } from '~/components/Forms/RecruitForm/Common/recruitFormExpandCss';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { palettes } from '~/styles/utils/palettes';
import { regex } from '~/utils/regex';

const fieldName = 'contact';
const maxLength = 500;

const validateContact = (value: string) => {
  if (value.length > maxLength) {
    return `연락처의 길이는 ${maxLength}자 이하여야 합니다.`;
  }
  if (!regex.url.test(value)) return '유효하지 않은 링크 형식입니다.';
  return true;
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
      <div css={titleCss}>
        오픈카톡방 또는 디스코드 등 연락할 수 있는 링크를 남겨주세요 (선택)
      </div>

      <TextInput
        size="md"
        autoComplete="off"
        placeholder="링크를 입력해주세요"
        css={inputCss}
        defaultValue={defaultContact}
        {...register(fieldName, {
          validate: validateContact,
        })}
      />
      <ErrorMessage
        name={fieldName}
        render={({ message }) => <AlertText>{message}</AlertText>}
      />
    </div>
  );
};

const inputCss = css({
  width: '100%',
});

const titleCss = css(recruitFormExpandCss, {
  padding: '12px 25px',
  backgroundColor: palettes.background.grey,
  marginBottom: 32,
});
