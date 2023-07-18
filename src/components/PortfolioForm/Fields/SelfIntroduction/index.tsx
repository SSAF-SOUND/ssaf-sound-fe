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
const requiredErrorMessage = '자기소개는 필수로 입력해야 합니다.';
const maxLengthErrorMessage = `자기소개는 ${maxLength}자 이하로 작성해야 합니다.`;

// 에러 메세지가 있는 경우에 유효하지 않음
const validateSelfIntroduction = (error?: string) => () => !error || error;

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

  const errorMessage = errors?.selfIntroduction?.message;

  const handleInputChange: EditorProps['onChange'] = (value, d, s, editor) => {
    setValue(fieldName, value);

    const textLength = editor.getText().length - 1;

    // 여기서 수동으로 설정하는 에러는 `Form`유효성에 영향을 미치지 않으므로
    // 여기서 직접 수동으로 에러 메세지를 세팅해주고, `register` 호출할 때 에러 메세지가 존재하는 경우 폼 제출이 불가능하도록
    // 한번 더 세팅해줘야 합니다.
    if (textLength <= 0) {
      setError(fieldName, { message: requiredErrorMessage });
      return;
    }

    if (textLength >= maxLength) {
      setError(fieldName, { message: maxLengthErrorMessage });
      return;
    }
    if (errorMessage) clearErrors(fieldName);
  };

  register(fieldName, {
    required: requiredErrorMessage,
    validate: validateSelfIntroduction(errorMessage),
  });

  return (
    <div className={className}>
      <p css={labelCss}>⓵ 500자 내외로 짧지만 강렬한 자기소개를 작성해보세요</p>
      <Editor
        defaultValue={defaultSelfIntroduction}
        withCustomToolbar={false}
        onChange={handleInputChange}
      />
      {errorMessage && <AlertText>{errorMessage}</AlertText>}
    </div>
  );
};

const labelCss = css(
  { color: palettes.font.lightGrey, marginBottom: 10 },
  fontCss.style.R14
);
