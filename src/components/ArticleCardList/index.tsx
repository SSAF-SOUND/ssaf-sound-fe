import type { InfiniteData } from '@tanstack/query-core';
import type { ForwardedRef } from 'react';
import type { GetArticlesApiData } from '~/services/article';

import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { ArticleCard } from '~/components/ArticleCard';
import { flex } from '~/styles/utils';
import { concat } from '~/utils';

interface ArticleCardListProps {
  articlesPages?: InfiniteData<GetArticlesApiData['data']>['pages'];
  getNextPage: () => void;
  hasNextPage?: boolean;
  className?: string;
}

const ArticleCardList = (props: ArticleCardListProps) => {
  const { articlesPages, className, getNextPage, hasNextPage } = props;
  const articles = articlesPages?.map((pages) => pages.posts).reduce(concat);

  return (
    <Virtuoso
      className={className}
      useWindowScroll
      data={articles}
      itemContent={(index, article) => (
        <ArticleCard key={article.postId} article={article} />
      )}
      endReached={hasNextPage ? getNextPage : undefined}
      overscan={200}
      components={{ List, Footer: hasNextPage ? Footer : undefined }}
    />
  );
};

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
List.displayName = 'ArticleCardList';

const Footer = () => {
  const skeletonCount = 6;
  return (
    <div css={[listCss, { marginTop: itemGap }]}>
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => {
          return <ArticleCard.Skeleton key={index} />;
        })}
    </div>
  );
};

export default ArticleCardList;

const itemGap = 16;
const listCss = css(flex('', '', 'column', itemGap));
