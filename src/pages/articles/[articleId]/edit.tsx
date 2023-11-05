import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';
import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils';

import { useRouter } from 'next/router';

import { dequal } from 'dequal';
import { useEffect, useState } from 'react';

import { ArticleError } from '~/components/Article/ArticleError';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import ArticleForm from '~/components/Forms/ArticleForm';
import {
  useArticleCategories,
  useArticleDetail,
  useUpdateArticle,
} from '~/services/article/hooks';
import { reconfirmArticleFormUnload } from '~/services/article/utils/reconfirmArticleFormUnload';
import { handleAxiosError } from '~/utils';
import { createAuthGuard } from '~/utils/createAuthGuard';
import { createNoIndexPageMetaData } from '~/utils/createNoIndexPageMetaData';
import { routes } from '~/utils/routes';

const metaTitle = '게시글 수정';

const ArticleEditPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as { articleId: string };
  const articleId = Number(query.articleId);
  const {
    data: articleDetail,
    isLoading: isArticleDetailLoading,
    isError: isArticleDetailError,
    error: articleDetailError,
  } = useArticleDetail(articleId);
  const {
    data: articleCategories,
    isLoading: isArticleCategoriesLoading,
    isError: isArticleCategoriesError,
    error: articleCategoriesError,
  } = useArticleCategories();
  const { mutateAsync: updateArticle } = useUpdateArticle(articleId);
  const [prevArticleFormValuesSnapshot, setPrevArticleFormValuesSnapshot] =
    useState<ArticleFormValues | undefined>(undefined);

  useEffect(() => {
    if (!articleDetail) return;
    if (prevArticleFormValuesSnapshot) return;

    const { title, content, images, boardId, anonymity } = articleDetail;

    setPrevArticleFormValuesSnapshot({
      title,
      content,
      images,
      category: boardId,
      anonymous: anonymity,
    });
  }, [prevArticleFormValuesSnapshot, articleDetail]);

  if (isArticleDetailLoading || isArticleCategoriesLoading) {
    return <FullPageLoader text="데이터를 불러오는 중입니다." />;
  }

  if (isArticleDetailError || isArticleCategoriesError) {
    const error = articleDetailError ?? articleCategoriesError;
    return <ArticleError error={error} />;
  }

  const { mine, title, content, images, anonymity, boardId } = articleDetail;

  if (!mine) {
    router.replace(routes.unauthorized());
    return <FullPageLoader />;
  }

  const onValidSubmit: ArticleFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    const redirect = () => router.push(routes.article.detail(articleId));
    const notChanged = dequal(formValues, prevArticleFormValuesSnapshot);

    if (notChanged) {
      if (window.confirm('수정된 내용이 없습니다. 게시글 수정을 종료할까요?')) {
        redirect();
      }
      return;
    }

    try {
      await updateArticle(formValues);
      await redirect();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const onClickTitleBarClose = () => {
    if (reconfirmArticleFormUnload()) {
      router.push(routes.article.detail(articleId));
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={{ paddingTop: 10 }}>
        <ArticleForm
          onValidSubmit={onValidSubmit}
          options={{
            titleBarText: '게시글 수정',
            onClickTitleBarClose,
            disableArticleCategorySelection: true,
          }}
          defaultValues={{
            category: boardId,
            title,
            content,
            images,
            anonymous: anonymity,
          }}
          articleCategories={articleCategories}
        />
      </main>

      <Footer />
    </>
  );
};

export default ArticleEditPage;
ArticleEditPage.auth = createAuthGuard();
ArticleEditPage.meta = createNoIndexPageMetaData(metaTitle);
ArticleEditPage.mainLayoutStyle = { overflow: 'unset' };
