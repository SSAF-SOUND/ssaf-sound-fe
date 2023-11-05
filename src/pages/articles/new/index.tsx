import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import ArticleForm, {
  defaultArticleFormValues,
} from '~/components/Forms/ArticleForm';
import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';
import {
  useArticleCategories,
  useCreateArticle,
} from '~/services/article/hooks';
import { reconfirmArticleFormUnload } from '~/services/article/utils/reconfirmArticleFormUnload';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';

const metaTitle = '게시글 작성';

/* /articles/new?categoryId=${categoryId} */
const ArticleCreatePage: CustomNextPage = () => {
  const router = useRouter();
  const { mutateAsync: createArticle } = useCreateArticle();

  const query = router.query as { categoryId: string };
  const { data: articleCategories } = useArticleCategories();
  const categoryId = Number(query.categoryId);

  useUnloadReconfirmEffect();

  useEffect(() => {
    if (!articleCategories) return;

    const isValidCategoryId = articleCategories.some(
      ({ boardId }) => boardId === categoryId
    );

    if (!isValidCategoryId) {
      router.replace(
        routes.article.create({ categoryId: articleCategories[0].boardId })
      );
    }
  }, [articleCategories, router, categoryId]);

  if (!articleCategories) {
    return <FullPageLoader />;
  }

  const onValidSubmit: ArticleFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    try {
      const articleId = await createArticle({
        ...formValues,
        categoryId: formValues.category,
      });

      await router.replace(routes.article.detail(articleId));
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const onClickTitleBarClose = () => {
    if (reconfirmArticleFormUnload()) {
      router.push(routes.article.category({ categoryId }));
    }
  };

  const onInvalidSubmit = (
    message = '유효하지 않은 필드가 있는지 확인해주세요'
  ) => {
    customToast.clientError(message);
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={{ paddingTop: 10 }}>
        <ArticleForm
          articleCategories={articleCategories}
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          defaultValues={{
            ...defaultArticleFormValues,
            category: categoryId,
          }}
          options={{
            onClickTitleBarClose,
          }}
        />
      </main>

      <Footer />
    </>
  );
};

export default ArticleCreatePage;
ArticleCreatePage.auth = createAuthGuard();
ArticleCreatePage.meta = createNoIndexPageMetaData(metaTitle);
ArticleCreatePage.mainLayoutStyle = { overflow: 'unset' };
