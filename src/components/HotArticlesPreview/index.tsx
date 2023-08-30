import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { HotArticlesPreviewArticleItem } from '~/components/HotArticlesPreview/HotArticlesPreviewArticleItem';
import { PreviewErrorCard } from '~/components/PreviewErrorCard';
import TitleBar from '~/components/TitleBar';
import { useHotArticles } from '~/services/article';
import { flex, palettes } from '~/styles/utils';
import { routes } from '~/utils';

export interface HotArticlesPreviewProps {
  className?: string;
}

export const HotArticlesPreview = (props: HotArticlesPreviewProps) => {
  const { className } = props;
  const {
    data: hotArticles,
    isLoading: isHotArticlesLoading,
    isError: isHotArticlesError,
    refetch,
  } = useHotArticles();

  const maxViewCount = 5;
  const latestHotArticles = hotArticles?.pages[0].posts.slice(0, maxViewCount);

  return (
    <div className={className}>
      <TitleBar.Preview
        title="HOT 게시글"
        moreLinkRoute={routes.articles.hot()}
        css={{ marginBottom: 16 }}
      />

      <div css={articlesContainerCss}>
        {isHotArticlesLoading && <HotArticlesPreviewSkeleton />}

        {isHotArticlesError && (
          <PreviewErrorCard css={{ height: 200 }} onClickRetry={refetch} />
        )}

        {latestHotArticles &&
          latestHotArticles.map((article) => (
            <HotArticlesPreviewArticleItem
              key={article.postId}
              article={article}
            />
          ))}
      </div>
    </div>
  );
};

const articlesContainerCss = css(flex('', '', 'column'));

const HotArticlesPreviewSkeleton = () => {
  const skeletonCount = 5;
  return (
    <Skeleton
      count={skeletonCount}
      width="100%"
      height={30}
      style={{ marginBottom: 4 }}
      baseColor={palettes.background.grey}
      enableAnimation={false}
    />
  );
};
