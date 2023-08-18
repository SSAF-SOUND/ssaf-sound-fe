import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import ArticleForm from '~/components/Forms/ArticleForm';
import { useArticleCategories, useCreateArticle } from '~/services/article';
import { handleAxiosError, routes } from '~/utils';

/* /articles/new?categoryId=${categoryId} */
const ArticleCreatePage: CustomNextPage = () => {
  const router = useRouter();
  const { mutateAsync: createArticle } = useCreateArticle();

  const query = router.query as { categoryId: string };
  const { data: articleCategories } = useArticleCategories();
  const categoryId = Number(query.categoryId);

  useEffect(() => {
    if (!articleCategories) return;

    const isValidCategoryId = articleCategories.some(
      ({ boardId }) => boardId === categoryId
    );

    if (!isValidCategoryId) {
      router.replace(routes.articles.create(articleCategories[0].boardId));
    }
  }, [articleCategories, router, categoryId]);

  if (!articleCategories) {
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: ArticleFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    try {
      const articleId = await createArticle({
        categoryId,
        ...formValues,
      });

      await router.replace(routes.articles.detail(articleId));
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div>
      <ArticleForm
        onValidSubmit={onValidSubmit}
        options={{
          titleBarCloseRoute: routes.articles.category(categoryId),
        }}
      />
    </div>
  );
};

export default ArticleCreatePage;
ArticleCreatePage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
