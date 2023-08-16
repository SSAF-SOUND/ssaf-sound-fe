import { css } from '@emotion/react';

import { TextInput } from '~/components/Common';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { palettes } from '~/styles/utils';

const fieldName = 'contact';
const maxLength = 500;

const validateContact = (value: string) => {
  if (value.length > maxLength) {
    return `연락처의 길이는 ${maxLength}자 이하여야 합니다.`;
  }
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

const titleCss = css({
  padding: '12px 25px',
  backgroundColor: palettes.background.grey,
  marginBottom: 32,
});
