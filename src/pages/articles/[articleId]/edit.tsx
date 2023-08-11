import type { CustomNextPage } from 'next/types';
import type { ArticleFormProps } from '~/components/Forms/ArticleForm';

import { useRouter } from 'next/router';

import {
  DefaultFullPageLoader,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import ArticleForm from '~/components/Forms/ArticleForm';
import RedirectionGuide from '~/components/RedirectionGuide';
import { useArticleDetail, useUpdateArticle } from '~/services/article';
import { handleAxiosError, routes } from '~/utils';

const metaTitle = '게시글 수정';
const ArticleEditPageHead = () => {
  return (
    <PageHead
      title={metaTitle}
      robots={{
        follow: false,
        index: false,
      }}
    />
  );
};

const ArticleEditPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as { articleId: string };
  const articleId = Number(query.articleId);
  const { data: articleDetail } = useArticleDetail(articleId);
  const { mutateAsync: updateArticle } = useUpdateArticle(articleId);

  if (!articleDetail) {
    return (
      <>
        <ArticleEditPageHead />
        <DefaultFullPageLoader text="데이터를 불러오는 중입니다." />
      </>
    );
  }

  if ('error' in articleDetail) {
    return (
      <RedirectionGuide
        title="게시글을 불러오는데 실패했습니다."
        description={articleDetail.error.message}
        redirectionText="게시판 모아보기 페이지로"
        redirectionTo={routes.articles.categories()}
      />
    );
  }

  const { mine, title, content, images, anonymity } = articleDetail;

  if (!mine) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: ArticleFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    try {
      await updateArticle(formValues);
      await router.push(routes.articles.detail(articleId));
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <ArticleEditPageHead />

      <PageHeadingText text={metaTitle} />

      <div>
        <ArticleForm
          onValidSubmit={onValidSubmit}
          options={{
            titleBarText: '게시글 수정',
            titleBarCloseRoute: routes.articles.detail(articleId),
          }}
          defaultValues={{
            title,
            content,
            images,
            anonymous: anonymity,
          }}
        />
      </div>
    </>
  );
};

export default ArticleEditPage;
ArticleEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
