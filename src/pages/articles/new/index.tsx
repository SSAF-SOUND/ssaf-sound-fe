import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import ArticleForm from '~/components/Forms/ArticleForm';
import { useArticleCategories } from '~/services/article';
import { routes } from '~/utils';

/* /articles/new?categoryId=${categoryId} */
const ArticleCreatePage: CustomNextPage = () => {
  const router = useRouter();

  const query = router.query as { categoryId: string };
  const { data: articleCategories } = useArticleCategories();
  const categoryId = Number(query.categoryId);

  useEffect(() => {
    if (!articleCategories) return;

    const isValidCategoryId = articleCategories.every(
      ({ boardId }) => boardId !== categoryId
    );

    if (!isValidCategoryId) {
      router.replace(routes.articles.create(articleCategories[0].boardId));
    }
  }, [articleCategories, router, categoryId]);

  if (!articleCategories) {
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: ArticleFormProps['onValidSubmit'] = (value) => {
    
  };

  return (
    <div>
      <ArticleForm
        onValidSubmit={(v) => {
          console.log(v);
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
