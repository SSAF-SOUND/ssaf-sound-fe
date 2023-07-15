import type { EditorProps } from '~/components/Editor';
import type { PortfolioFormValues } from '~/components/PortfolioForm/utils';

import { css } from '@emotion/react';
import { useFormState } from 'react-hook-form';

import { AlertText } from '~/components/Common';
import Editor from '~/components/Editor';
import { usePortfolioFormContext } from '~/components/PortfolioForm/utils';
import { fontCss, palettes } from '~/styles/utils';

const fieldName = 'selfIntroduction';
const maxLength = 500;
const errorMessage = `자기소개는 ${maxLength}자 이하로 작성해야 합니다.`;

interface SelfIntroductionProps {
  className?: string;
}

export const SelfIntroduction = (props: SelfIntroductionProps) => {
  const { className } = props;
  const { register, setValue, setError, clearErrors } =
    usePortfolioFormContext();
  const {
    errors,
    defaultValues: { selfIntroduction: defaultSelfIntroduction = '' } = {},
  } = useFormState<PortfolioFormValues>();
  const alertText = errors?.selfIntroduction?.message;

  const handleInputChange: EditorProps['onChange'] = (value, d, s, editor) => {
    setValue(fieldName, value);

    if (editor.getText().length - 1 <= 500) {
      if (alertText) clearErrors(fieldName);
      return;
    }

    setError(fieldName, { message: errorMessage });
  };

  register(fieldName);

  return (
    <div className={className}>
      <p css={labelCss}>⓵ 500자 내외로 짧지만 강렬한 자기소개를 작성해보세요</p>
      <Editor
        defaultValue={defaultSelfIntroduction}
        withCustomToolbar={false}
        onChange={handleInputChange}
      />
      {alertText && <AlertText>{alertText}</AlertText>}
    </div>
  );
};

const labelCss = css(
  { color: palettes.font.lightGrey, marginBottom: 10 },
  fontCss.style.R14
);
