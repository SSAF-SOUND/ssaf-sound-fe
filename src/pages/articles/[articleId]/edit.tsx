import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { DefaultFullPageLoader } from '~/components/Common';
import ArticleForm from '~/components/Forms/ArticleForm';
import RedirectionGuide from '~/components/RedirectionGuide';
import { useArticleDetail } from '~/services/article';
import { routes } from '~/utils';

const ArticleEditPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as { articleId: string };
  const articleId = Number(query.articleId);
  const { data: articleDetail } = useArticleDetail(articleId);

  if (!articleDetail) {
    return <DefaultFullPageLoader text="데이터를 불러오는 중입니다." />;
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

  const { mine } = articleDetail;

  if (!mine) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <div>
      <ArticleForm
        onValidSubmit={() => {}}
        options={{
          titleBarText: '게시글 수정',
          titleBarCloseRoute: routes.articles.detail(articleId),
        }}
      />
    </div>
  );
};

export default ArticleEditPage;
ArticleEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
