import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';
import type { ArticleCategory } from '~/services/article';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import { ArticleCategories } from '~/components/Forms/ArticleForm/Fields/ArticleCategories';
import TitleBar from '~/components/TitleBar';
import { articleCategories } from '~/mocks/handlers/article/data';
import { titleBarHeight } from '~/styles/utils';

import { ArticleTitle, ArticleContent, ArticleOptions } from './Fields';

interface ArticleFormOptions {
  onClickTitleBarClose: () => void;
  titleBarText: string;
  disableArticleCategorySelection: boolean;
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
  articleCategories: ArticleCategory[];
}

const ArticleForm = (props: ArticleFormProps) => {
  const {
    defaultValues = defaultArticleFormValues,
    onValidSubmit,
    onInvalidSubmit,
    options: {
      onClickTitleBarClose,
      titleBarText = '게시글 쓰기',
      disableArticleCategorySelection = false,
    } = {},
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
      errors.images?.message ||
      errors.category?.message;

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
          onClickClose={onClickTitleBarClose}
        />
        <ArticleTitle />
        <ArticleCategories
          articleCategories={articleCategories}
          disabled={disableArticleCategorySelection}
        />
        <ArticleContent />
        <ArticleOptions />
      </form>
    </FormProvider>
  );
};

export const defaultArticleFormValues: ArticleFormValues = {
  title: '',
  content: '',
  anonymous: true,
  images: [],
  category: 1,
};

export default ArticleForm;

const selfCss = css({
  padding: `${titleBarHeight}px 0`,
});
