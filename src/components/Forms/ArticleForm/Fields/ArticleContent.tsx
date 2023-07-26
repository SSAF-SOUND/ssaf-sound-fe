import type { EditorProps } from '~/components/Editor';

import { css } from '@emotion/react';

import { AlertText } from '~/components/Common';
import Editor from '~/components/Editor';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';
import { palettes } from '~/styles/utils';

const fieldName = 'content';
const minLength = 2;
const maxLength = 4000;
const lengthErrorMessage = `글 내용은 ${minLength}자 이상, ${maxLength}자 이하까지 가능합니다.`;

export const ArticleContent = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: { defaultValues: { content: defaultContent } = {}, errors },
  } = useArticleFormContext();

  const errorMessage = errors?.content?.message;

  const onChange: EditorProps['onChange'] = (value, d, s, editor) => {
    setValue(fieldName, value, {
      shouldDirty: true,
    });

    const textLength = editor.getText().length - 1;

    if (textLength < minLength || textLength > maxLength) {
      setError(fieldName, {
        message: lengthErrorMessage,
      });
      return;
    }

    if (errorMessage) clearErrors(fieldName);
  };

  register(fieldName);

  return (
    <div>
      <Editor defaultValue={defaultContent} onChange={onChange} />
      {errorMessage && (
        <AlertText css={alertMessageCss}>{errorMessage}</AlertText>
      )}
    </div>
  );
};

const alertMessageCss = css({
  padding: '0 10px',
  backgroundColor: palettes.white,
});
