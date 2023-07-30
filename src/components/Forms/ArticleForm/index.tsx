import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';
import type { Route } from '~/types';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { titleBarHeight } from '~/styles/utils';

import { ArticleTitle, ArticleContent, ArticleOptions } from './Fields';

interface ArticleFormOptions {
  titleBarCloseRoute: Route;
  titleBarText: string;
}

type OriginalOnInvalidSubmit = SubmitErrorHandler<ArticleFormValues>;
type OnInvalidSubmit = (
  message?: string,
  ...args: Parameters<OriginalOnInvalidSubmit>
) => ReturnType<OriginalOnInvalidSubmit>;

export interface ArticleFormProps {
  className?: string;
  defaultValues?: ArticleFormValues;
  onValidSubmit: SubmitHandler<ArticleFormValues>;
  onInvalidSubmit?: OnInvalidSubmit;
  options?: Partial<ArticleFormOptions>;
}

const ArticleForm = (props: ArticleFormProps) => {
  const {
    defaultValues = defaultArticleFormValues,
    onValidSubmit,
    onInvalidSubmit,
    options: { titleBarCloseRoute, titleBarText = '게시글 쓰기' } = {},
  } = props;

  const methods = useForm<ArticleFormValues>({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleInvalidSubmit: OriginalOnInvalidSubmit = (errors, event) => {
    const errorMessage =
      errors.title?.message ||
      errors.content?.message ||
      errors.images?.message;

    onInvalidSubmit?.(errorMessage, errors, event);
  };

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        onSubmit={handleSubmit(onValidSubmit, handleInvalidSubmit)}
      >
        <TitleBar.Form
          title={titleBarText}
          submitButtonText="완료"
          isSubmitting={isSubmitting}
          onClickClose={titleBarCloseRoute}
        />
        <ArticleTitle />
        <ArticleContent />
        <ArticleOptions />
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
