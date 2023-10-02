import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common/AlertText';
import Editor from '~/components/Editor';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';

const fieldName = 'title';
const minTitleLength = 2;
const maxTitleLength = 100;
const validateTitle = (value: string) => {
  if (value.length < minTitleLength || value.length > maxTitleLength)
    return `제목은 ${minTitleLength}~${maxTitleLength}자 사이여야 합니다.`;

  return true;
};

export const ArticleTitle = () => {
  const {
    register,
    formState: { defaultValues: { title: defaultTitle } = {} },
  } = useArticleFormContext();

  return (
    <div>
      <Editor.TitleInput
        placeholder="제목"
        defaultValue={defaultTitle}
        {...register(fieldName, {
          validate: validateTitle,
        })}
      />
      <ErrorMessage
        name={fieldName}
        render={({ message }) => {
          return (
            <Editor.MessageBox css={errorMessageContainerCss}>
              <AlertText>{message}</AlertText>
            </Editor.MessageBox>
          );
        }}
      />
    </div>
  );
};

const errorMessageContainerCss = css({
  borderTop: 0,
  borderBottom: 0,
  padding: '4px 16px',
});
