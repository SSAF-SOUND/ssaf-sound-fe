import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { CommentFormProps } from '~/components/Forms/CommentForm';
import type { ArticleDetailError } from '~/services/article';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';
import { stripHtml } from 'string-strip-html';

import { Article } from '~/components/Article';
import ArticleComment from '~/components/ArticleComment';
import { Button, PageHead, PageHeadingText } from '~/components/Common';
import CommentForm from '~/components/Forms/CommentForm';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { commentDetails } from '~/mocks/handlers/comment/data';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleDetail, useArticleDetail } from '~/services/article';
import {
  useComments,
  useCreateComment,
  useInvalidateComments,
} from '~/services/comment';
import {
  flex,
  fontCss,
  globalVars,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import { routes } from '~/utils';
import { replaceMultipleSpacesWithSingle } from '~/utils/replaceMultipleSpacesWithSingle';

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

  const metaTitle = articleDetail.title;
  const metaDescription = replaceMultipleSpacesWithSingle(
    stripHtml(articleDetail.content).result
  );
  const pageUrl = routes.articles.detail(articleDetail.postId);

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: pageUrl,
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          css={titleBarCss}
          title={categoryTitle}
          withoutClose
          onClickBackward={routes.articles.category(articleCategoryId)}
        />

        <Article
          css={[articleCss, expandCss, { marginBottom: 40 }]}
          articleDetail={articleDetail}
        />

        <CommentsLayer articleId={articleId} />

        {/*<CommentFormLayer articleId={articleId} />*/}
      </div>
    </>
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

const CommentsLayer = (props: { articleId: number }) => {
  const { articleId } = props;
  const skeletonCount = 8;
  const { data: comments, isLoading } = useComments(articleId);

  return (
    <div css={flex('', '', 'column', 20)}>
      {isLoading && (
        <Skeleton
          count={skeletonCount}
          height={120}
          style={{ marginBottom: 20 }}
          baseColor={palettes.background.grey}
          enableAnimation={false}
        />
      )}

      {comments &&
        comments.map((comment) => {
          return (
            <ArticleComment
              key={comment.commentId}
              comment={commentDetails[1]}
            />
          );
        })}
    </div>
  );
};

interface CommentFormLayerProps {
  articleId: number;
}

const CommentFormLayer = (props: CommentFormLayerProps) => {
  const { articleId } = props;
  const { mutateAsync: createComment } = useCreateComment();
  const invalidateComments = useInvalidateComments(articleId);

  const onValidSubmit: CommentFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    try {
      await createComment({ articleId, ...formValues });
      await invalidateComments();
      reset({ content: '' });
    } catch (err) {
      console.error(err);
    }
  };
  return <CommentForm onValidSubmit={onValidSubmit} />;
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

const titleBarCss = css(fontCss.style.B16);

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
