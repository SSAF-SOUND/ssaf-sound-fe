import type { ReactQuillProps } from 'react-quill';

import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common/AlertText';
import Editor from '~/components/Editor';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';

const fieldName = 'content';
const minContentLength = 2;
const maxContentLength = 3000;
const lengthErrorMessage = `본문의 내용은 ${minContentLength}자 이상 ${maxContentLength}자 이하여야 합니다.`;
const requiredErrorMessage = '본문의 내용은 필수로 입력해야 합니다.';
const validateContent = (error?: string) => () => !error || error;

interface ContentProps {
  className?: string;
}

export const Content = (props: ContentProps) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: {
      defaultValues: { content: defaultContent } = {},
      errors,
      isSubmitted,
    },
  } = useRecruitFormContext();
  const errorMessage = errors.content?.message;
  const showErrorMessage = isSubmitted && errorMessage;

  const handleChangeValue: ReactQuillProps['onChange'] = (
    value: string,
    d,
    s,
    editor
  ) => {
    setValue(fieldName, value, {
      shouldDirty: true,
    });
    const textLength = editor.getText().length - 1;
    if (textLength < minContentLength || textLength > maxContentLength) {
      if (!errorMessage) setError(fieldName, { message: lengthErrorMessage });
      return;
    }

    if (errorMessage) clearErrors(fieldName);
  };

  register(fieldName, {
    validate: validateContent(errorMessage),
    required: requiredErrorMessage,
  });

  return (
    <div {...props}>
      <Editor
        defaultValue={defaultContent}
        onChange={handleChangeValue}
        placeholder="내용을 입력해주세요"
      />

      {showErrorMessage && (
        <ErrorMessage
          name={fieldName}
          render={({ message }) => <AlertText>{message}</AlertText>}
        />
      )}
    </div>
  );
};
