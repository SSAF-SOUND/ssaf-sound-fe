import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Article } from '~/components/Article';
import { ArticleError } from '~/components/Article/ArticleError';
import ArticleComment from '~/components/ArticleComment';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import ArticleCommentForm from '~/components/Forms/ArticleCommentForm';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getArticleDetail } from '~/services/article/apis';
import { useArticleDetail } from '~/services/article/hooks';
import {
  useArticleComments,
  useCreateArticleComment,
  useInvalidateArticleComments,
} from '~/services/articleComment';
import { useMyInfo } from '~/services/member';
import {
  expandCss,
  flex,
  fontCss,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import {
  createAxiosCookieConfig,
  getErrorResponse,
  notFoundPage,
  ResponseCode,
} from '~/utils';
import { handleAxiosError } from '~/utils/handleAxiosError';
import { routes } from '~/utils/routes';
import { stripHtmlTags } from '~/utils/stripHtmlTags';

interface ArticleDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
  const { articleId } = props;
  const {
    data: articleDetail,
    isError: isArticleDetailError,
    error: articleDetailError,
    isLoading: isArticleDetailLoading,
  } = useArticleDetail(articleId);

  if (isArticleDetailLoading) {
    return <FullPageLoader text="게시글을 불러오는 중입니다." />;
  }

  if (isArticleDetailError) {
    return <ArticleError error={articleDetailError} />;
  }

  const { boardTitle: articleCategoryTitle, boardId: articleCategoryId } =
    articleDetail;

  const metaTitle = articleDetail.title;
  const metaDescription = stripHtmlTags(articleDetail.content).slice(0, 100);
  const pageUrl = routes.article.detail(articleDetail.postId).pathname;

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

      <main css={selfCss}>
        <TitleBar.Default
          css={titleBarCss}
          title={articleCategoryTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '게시판 목록', link: routes.article.categories() },
                {
                  name: articleCategoryTitle,
                  link: routes.article.category({
                    categoryId: articleCategoryId,
                  }),
                },
                {
                  name: '게시글 상세',
                  link: routes.article.detail(articleId),
                  active: true,
                },
              ]}
            />
          }
        />

        <Article
          css={[articleCss, expandCss(), { marginBottom: 40 }]}
          articleDetail={articleDetail}
        />

        <ArticleCommentsLayer
          articleId={articleId}
          css={{ marginBottom: 40 }}
        />

        <ArticleCommentFormLayer articleId={articleId} />
      </main>

      <Footer />
    </>
  );
};

export default ArticleDetailPage;

const selfCss = css({
  padding: `${titleBarHeight + breadcrumbsHeight}px 0 240px`,
});

const articleCss = css({
  padding: '20px 24px',
  backgroundColor: palettes.background.grey,
});

const titleBarCss = css(fontCss.style.B16);

const ArticleCommentsLayer = (props: {
  articleId: number;
  className?: string;
}) => {
  const { articleId, className } = props;
  const skeletonCount = 8;
  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useArticleComments(articleId);

  return (
    <div css={commentsLayerSelfCss} className={className}>
      {isLoading && (
        <Skeleton
          count={skeletonCount}
          height={120}
          style={{ marginBottom: 20 }}
          baseColor={palettes.background.grey}
          enableAnimation={false}
        />
      )}

      {isSuccess &&
        comments.map((comment) => {
          return (
            <ArticleComment
              key={comment.commentId}
              comment={comment}
              articleId={articleId}
              isRecruitComment={false}
            />
          );
        })}
    </div>
  );
};

const commentsLayerSelfCss = css(flex('', '', 'column', 20));

const ArticleCommentFormLayer = (props: { articleId: number }) => {
  const { articleId } = props;
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: createArticleComment } =
    useCreateArticleComment(articleId);
  const [formKey, setFormKey] = useState(1);

  const invalidateComments = useInvalidateArticleComments(articleId);
  const isSignedIn = !!myInfo;

  const onValidSubmit: ArticleCommentFormProps['onValidSubmit'] = async (
    _,
    formValues
  ) => {
    try {
      await createArticleComment(formValues);
      await invalidateComments();
      setFormKey((p) => p + 1);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <ArticleCommentForm
      onValidSubmit={onValidSubmit}
      key={formKey}
      options={{
        showNotSignedInFallback: !isSignedIn,
      }}
    />
  );
};

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
    return notFoundPage;
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: queryKeys.articles.detail(articleId),
      queryFn: () =>
        getArticleDetail(articleId, {
          publicRequest: true,
          config: createAxiosCookieConfig(context.req.headers.cookie),
        }),
    });
  } catch (err) {
    const errorResponse = getErrorResponse(err);
    if (errorResponse?.code === ResponseCode.ARTICLE_NOT_FOUND) {
      return notFoundPage;
    }
  }

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: {
      articleId,
      dehydratedState,
    },
  };
};
