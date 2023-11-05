import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';

import { useRouter } from 'next/router';

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
import { createAuthGuard } from '~/utils/createAuthGuard';
import { createNoIndexPageMetaData } from '~/utils/createNoIndexPageMetaData';
import { handleAxiosError } from '~/utils/handleAxiosError';
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
    try {
      await updateArticle(formValues);
      await router.push(routes.article.detail(articleId));
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
