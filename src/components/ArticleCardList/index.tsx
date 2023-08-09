import type { InfiniteData } from '@tanstack/query-core';
import type { ForwardedRef } from 'react';
import type { GetArticlesApiData } from '~/services/article';

import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { ArticleCard, HotArticleCard } from '~/components/ArticleCard';
import { flex } from '~/styles/utils';
import { concat } from '~/utils';

interface ArticleCardListProps {
  articlesPages: InfiniteData<GetArticlesApiData['data']>['pages'];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  className?: string;
  hot?: boolean;
}

const ArticleCardList = (props: ArticleCardListProps) => {
  const {
    articlesPages,
    className,
    fetchNextPage,
    hasNextPage,
    hot = false,
  } = props;
  const articles = articlesPages?.map((pages) => pages.posts).reduce(concat);
  const loadMore = hasNextPage ? fetchNextPage : undefined;
  const Card = hot ? HotArticleCard : ArticleCard;

  return (
    <Virtuoso
      className={className}
      useWindowScroll
      data={articles}
      endReached={loadMore}
      overscan={200}
      components={{ List }}
      itemContent={(index, article) => (
        <Card key={article.postId} article={article} />
      )}
    />
  );
};

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
List.displayName = 'ArticleCardList';

export default ArticleCardList;

const itemGap = 16;
const listCss = css(flex('', '', 'column', itemGap));
