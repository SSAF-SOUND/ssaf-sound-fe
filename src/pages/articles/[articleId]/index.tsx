import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleDetailError } from '~/services/article';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Article } from '~/components/Article';
import { Button } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleDetail, useArticleDetail } from '~/services/article';
import { flex, globalVars, palettes, titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

interface ArticleDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
  const { articleId } = props;
  const { data: articleDetail } = useArticleDetail(articleId);

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

  if ('error' in articleDetail) {
    return <NotExistsArticle articleError={articleDetail} />;
  }

  const { title: categoryTitle, boardId: articleCategoryId } =
    articleDetail.category;

  return (
    <div css={selfCss}>
      <TitleBar.Default
        title={categoryTitle}
        withoutClose
        onClickBackward={routes.articles.category(articleCategoryId)}
      />

      <Article css={[articleCss, expandCss]} articleDetail={articleDetail} />
    </div>
  );
};

export default ArticleDetailPage;

interface NotExistsArticleProps {
  articleError: ArticleDetailError;
}

const NotExistsArticle = (props: NotExistsArticleProps) => {
  const { articleError } = props;
  const router = useRouter();

  return (
    <RedirectionGuide
      title="Error"
      description={articleError.error.message}
      customLinkElements={
        <div css={flex('', '', 'column', 10)}>
          <Button size="lg" asChild>
            <Link href={routes.articles.categories()}>
              게시판 모아보기 페이지로
            </Link>
          </Button>
          <Button
            variant="literal"
            size="lg"
            onClick={() => router.back()}
            style={{ textDecoration: 'underline', alignSelf: 'center' }}
          >
            뒤로 가기
          </Button>
        </div>
      }
    />
  );
};

/* css */

const selfPaddingX = 0;
const negativeMarginForExpand = `calc(-1 * (${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var}))`;

const selfCss = css({
  padding: `${titleBarHeight}px ${selfPaddingX}px`,
});

const expandCss = css({
  width: 'auto',
  margin: `0 ${negativeMarginForExpand}`,
});

const articleCss = css({
  padding: '20px 24px',
  backgroundColor: palettes.background.grey,
});

/* ssr */

interface Props {
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
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
  });

  const dehydratedState = await dehydrate();

  return {
    props: {
      articleId,
      dehydratedState,
    },
  };
};
