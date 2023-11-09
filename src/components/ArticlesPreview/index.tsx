import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { ArticlesPreviewArticleItem } from '~/components/ArticlesPreview/ArticlesPreviewArticleItem';
import { PreviewErrorCard } from '~/components/PreviewErrorCard';
import TitleBar from '~/components/TitleBar';
import { useHotArticlesByOffset } from '~/services/article/hooks';
import { flex, palettes } from '~/styles/utils';
import { routes } from '~/utils/routes';

export interface ArticlesPreviewProps {
  className?: string;
}

export const ArticlesPreview = (props: ArticlesPreviewProps) => {
  const { className } = props;
  const {
    data: hotArticles,
    isLoading: isHotArticlesLoading,
    isError: isHotArticlesError,
    isSuccess: isHotArticlesSuccess,
  } = useHotArticlesByOffset();

  const maxViewCount = 5;
  const latestHotArticles = hotArticles?.posts.slice(0, maxViewCount);
  const notExistHotArticles = latestHotArticles?.length === 0;

  return (
    <div className={className}>
      <TitleBar.Preview
        title="HOT 게시글"
        moreLinkRoute={routes.article.hot()}
        css={{ marginBottom: 16 }}
      />

      <div css={articlesContainerCss}>
        {isHotArticlesLoading && <ArticlesPreviewSkeleton />}

        {isHotArticlesError && (
          <PreviewErrorCard
            css={{ height: 200 }}
            errorMessage={`핫 게시글 목록을 불러오는 중 오류가 발생했습니다`}
          />
        )}

        {isHotArticlesSuccess &&
          (notExistHotArticles ? (
            <NotExistHotArticles />
          ) : (
            latestHotArticles?.map((article) => (
              <ArticlesPreviewArticleItem
                key={article.postId}
                article={article}
              />
            ))
          ))}
      </div>
    </div>
  );
};

const articlesContainerCss = css(flex('', '', 'column'));

const ArticlesPreviewSkeleton = () => {
  const skeletonCount = 5;
  return (
    <Skeleton
      count={skeletonCount}
      width="100%"
      height={50}
      style={{ marginBottom: 4 }}
      baseColor={palettes.background.grey}
      enableAnimation={false}
    />
  );
};

const NotExistHotArticles = () => {
  return <div css={notExistHotArticlesCss}>아직 게시글이 없습니다.</div>;
};

const notExistHotArticlesCss = css(
  {
    width: '100%',
    height: 170,
  },
  flex('center', 'center', 'column')
);
