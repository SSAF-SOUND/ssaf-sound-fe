import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Article } from '~/components/Article';
import { ArticleError } from '~/components/Article/ArticleError';
import ArticleComment from '~/components/ArticleComment';
import {
  DefaultFullPageLoader,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import ArticleCommentForm from '~/components/Forms/ArticleCommentForm';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleDetail, useArticleDetail } from '~/services/article';
import {
  useArticleComments,
  useCreateArticleComment,
  useInvalidateArticleComments,
} from '~/services/articleComment';
import { useMyInfo } from '~/services/member';
import {
  flex,
  fontCss,
  globalVars,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';
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
    refetch,
  } = useArticleDetail(articleId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isArticleDetailLoading) {
    return <DefaultFullPageLoader text="게시글을 불러오는 중입니다." />;
  }

  if (isArticleDetailError) {
    return <ArticleError error={articleDetailError} />;
  }

  const { boardTitle: articleCategoryTitle, boardId: articleCategoryId } =
    articleDetail;

  const metaTitle = articleDetail.title;
  const metaDescription = stripHtmlTags(articleDetail.content);

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
          title={articleCategoryTitle}
          withoutClose
          onClickBackward={routes.articles.category(articleCategoryId)}
        />

        <Article
          css={[articleCss, expandCss, { marginBottom: 40 }]}
          articleDetail={articleDetail}
        />

        <ArticleCommentsLayer
          articleId={articleId}
          css={{ marginBottom: 40 }}
        />

        <ArticleCommentFormLayer articleId={articleId} />
      </div>
    </>
  );
};

export default ArticleDetailPage;

const selfPaddingX = 10;
const negativeMarginForExpand = `calc(-1 * (${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var}))`;

const selfCss = css({
  padding: `${titleBarHeight}px ${selfPaddingX}px 240px`,
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

const ArticleCommentsLayer = (props: {
  articleId: number;
  className?: string;
}) => {
  const { articleId, className } = props;
  const skeletonCount = 8;
  const { data: comments, isLoading } = useArticleComments(articleId);

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

      {comments &&
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
