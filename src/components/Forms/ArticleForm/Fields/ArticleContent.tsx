import type { EditorProps } from '~/components/Editor';

import { css } from '@emotion/react';

import { AlertText } from '~/components/Common';
import Editor from '~/components/Editor';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';
import { palettes } from '~/styles/utils';

const fieldName = 'content';
const minContentLength = 2;
const maxContentLength = 4000;
const lengthErrorMessage = `내용은 ${minContentLength}~${maxContentLength}자 사이여야 합니다.`;
const validateArticleContent = (error?: string) => () => !error || error;

export const ArticleContent = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: {
      isSubmitted,
      defaultValues: { content: defaultContent } = {},
      errors,
    },
  } = useArticleFormContext();

  const errorMessage = errors?.content?.message;
  const showErrorMessage = isSubmitted && errorMessage;

  const onChange: EditorProps['onChange'] = (value, d, s, editor) => {
    setValue(fieldName, value, {
      shouldDirty: true,
    });

    const textLength = editor.getText().length - 1;

    if (textLength < minContentLength || textLength > maxContentLength) {
      setError(fieldName, {
        message: lengthErrorMessage,
      });
      return;
    }

    if (errorMessage) clearErrors(fieldName);
  };

  register(fieldName, {
    validate: validateArticleContent(errorMessage),
  });

  return (
    <div>
      <Editor
        placeholder="내용"
        defaultValue={defaultContent}
        onChange={onChange}
      />
      {showErrorMessage && (
        <Editor.MessageBox css={errorMessageContainerCss}>
          <AlertText>{errorMessage}</AlertText>
        </Editor.MessageBox>
      )}
    </div>
  );
};

const errorMessageContainerCss = css({
  borderBottom: 0,
  borderTop: 0,
  padding: '0 15px',
  backgroundColor: palettes.white,
});
