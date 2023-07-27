import type {
  SubmitErrorHandler,
  SubmitHandler} from 'react-hook-form';
import type { PartialDeep } from 'type-fest';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';

import { css } from '@emotion/react';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { titleBarHeight } from '~/styles/utils';

import { ArticleTitle, ArticleContent, ArticleImages } from './Fields';

interface ArticleFormProps {
  defaultValues?: PartialDeep<ArticleFormValues>;
  onValidSubmit: SubmitHandler<ArticleFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<ArticleFormValues>;
}

const ArticleForm = (props: ArticleFormProps) => {
  const {
    defaultValues = defaultArticleFormValues,
    onValidSubmit,
    onInvalidSubmit,
  } = props;

  const methods = useForm<ArticleFormValues>({
    defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
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
