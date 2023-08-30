import { css } from '@emotion/react';

import { HotArticlesPreviewArticleItem } from '~/components/HotArticlesPreview/HotArticlesPreviewArticleItem';
import TitleBar from '~/components/TitleBar';
import { useHotArticles } from '~/services/article';
import { flex } from '~/styles/utils';
import { routes } from '~/utils';

export interface HotArticlesPreviewProps {
  className?: string;
}

export const HotArticlesPreview = (props: HotArticlesPreviewProps) => {
  const { className } = props;
  const { data: hotArticles } = useHotArticles();

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
        {latestHotArticles?.map((article) => (
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
