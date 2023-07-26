import type { PartialDeep } from 'type-fest';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { titleBarHeight } from '~/styles/utils';

import { ArticleTitle, ArticleContent, ArticleImages } from './Fields';

interface ArticleFormProps {
  defaultValues?: PartialDeep<ArticleFormValues>;
}

const ArticleForm = (props: ArticleFormProps) => {
  const { defaultValues = defaultArticleFormValues } = props;
  const methods = useForm<ArticleFormValues>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form css={selfCss}>
        <TitleBar.Form title="게시글 쓰기" submitButtonText="완료" />
        <ArticleTitle />
        <ArticleContent />
        <ArticleImages />
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
