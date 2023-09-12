import type { IconNames } from '~/components/Common';
import type { ArticleSummary } from '~/services/article';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { expandCss, flex, fontCss, lineClamp, palettes } from '~/styles/utils';
import { routes } from '~/utils';

export interface HotArticlesPreviewArticleItemProps {
  article: ArticleSummary;
}

export const HotArticlesPreviewArticleItem = (
  props: HotArticlesPreviewArticleItemProps
) => {
  const { article } = props;
  const { boardTitle, title, likeCount, commentCount, postId } = article;

  return (
    <Link css={selfCss} href={routes.articles.detail(postId)}>
      <ArticleCategoryNameBadge categoryName={boardTitle} />
      <h3 css={titleCss}>{title}</h3>
      <div css={statLayerCss}>
        <ArticleStat iconName="like" count={likeCount} />
        <ArticleStat iconName="chat" count={commentCount} />
      </div>
    </Link>
  );
};

const selfCss = css(
  {
    padding: '14px 25px',
    '&:hover': {
      backgroundColor: palettes.background.grey,
    },
  },
  expandCss(),
  flex('center', '', 'row', 12)
);

const titleCss = css(
  { flexGrow: 1, flexShrink: 1, wordBreak: 'break-all' },
  lineClamp(1)
);
const statLayerCss = css(flex('center', '', 'row', 8));

const ArticleCategoryNameBadge = (props: { categoryName: string }) => {
  const { categoryName } = props;
  const displayCategoryName = categoryName.slice(0, 2);

  return <div css={articleCategoryNameBadgeSelfCss}>{displayCategoryName}</div>;
};

const articleCategoryNameBadgeSelfCss = css(
  {
    flexShrink: 0,
    borderRadius: 20,
    padding: '2px 12px',
    backgroundColor: palettes.white,
    color: palettes.black,
  },
  fontCss.style.B12
);

const ArticleStat = (props: { iconName: IconNames; count: number }) => {
  const { iconName, count } = props;
  return (
    <div css={articleStatSelfCss}>
      <Icon name={iconName} size={16} />
      <strong>{count}</strong>
    </div>
  );
};

const articleStatSelfCss = css(
  flex('center', 'center', 'row', 4),
  fontCss.style.B12
);
