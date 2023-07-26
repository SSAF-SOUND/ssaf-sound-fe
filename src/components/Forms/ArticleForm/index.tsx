import type { PartialDeep } from 'type-fest';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import Editor from '~/components/Editor';
import TitleBar from '~/components/TitleBar';
import { useImageUpload } from '~/services/s3/hooks';
import { titleBarHeight } from '~/styles/utils';

interface ArticleFormProps {
  defaultValues?: PartialDeep<ArticleFormValues>;
}

const ArticleForm = (props: ArticleFormProps) => {
  const { defaultValues = defaultArticleFormValues } = props;
  const methods = useForm<ArticleFormValues>({
    defaultValues,
  });

  const { images, handleOpenImageUploader, isUploading } = useImageUpload();

  return (
    <FormProvider {...methods}>
      <form css={selfCss}>
        <TitleBar.Form title="게시글 쓰기" submitButtonText="완료" />
        <Editor.TitleInput />
        <Editor />
        <Editor.ThumbnailBar
          thumbnails={[
            'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
          ]}
        />

        <Editor.ToolBar>
          <Editor.ToolBarItem name="image" onClick={handleOpenImageUploader} />
        </Editor.ToolBar>
      </form>
    </FormProvider>
  );
};

const defaultArticleFormValues: ArticleFormValues = {
  title: '',
  content: '',
  anonymous: false,
  images: [],
};

export default ArticleForm;

const selfCss = css({
  padding: `${titleBarHeight}px 0`,
});
