import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleDetail, ArticleDetailError } from '~/services/article';

import Link from 'next/link';

import { Button } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleDetail } from '~/services/article';
import { fontCss } from '~/styles/utils';
import { routes } from '~/utils';

interface ArticleDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
  const { articleDetail, articleId } = props;

  if (!articleDetail) {
    return (
      <RedirectionGuide
        title="Error"
        description="게시글을 불러오는데 실패했습니다."
        redirectionText="게시글 모아보기 페이지로"
        redirectionTo={routes.articles.categories()}
      />
    );
  }

  return (
    <div>
      <h2 css={fontCss.style.B28}>ArticleDetail</h2>
      <Button asChild css={{ width: 100 }}>
        <Link href={routes.articles.create(1)}>글 작성</Link>
      </Button>
    </div>
  );
};

export default ArticleDetailPage;

interface Props {
  articleDetail: null | ArticleDetail | ArticleDetailError;
  articleId: number;
}

type Params = {
  articleId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const articleId = Number(context.params?.articleId);

  // 0. articleId가 유효하지 않음 (숫자가 아님) -> notFound
  // 1. 클라이언트 오류 (없는 게시글, 삭제된 게시글을 조회할 때)
  // 2. 서버 오류

  if (Number.isNaN(articleId)) {
    return {
      notFound: true,
    };
  }

  const dehydrate = prefetch({
    queryKey: queryKeys.article.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
  });

  const dehydratedState = await dehydrate();

  const articleDetail =
    (dehydratedState.queries[0]?.state?.data as
      | ArticleDetail
      | ArticleDetailError
      | undefined) ?? null;

  return {
    props: {
      articleId,
      articleDetail,
      dehydratedState,
    },
  };
};
