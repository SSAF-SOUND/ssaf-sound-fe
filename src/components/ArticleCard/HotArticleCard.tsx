import type { ArticleSummary } from '~/services/article';

import { css } from '@emotion/react';
import { memo } from 'react';

import ArticleCardLink from '~/components/ArticleCard/ArticleCardLink';
import CommentStat from '~/components/ArticleCard/CommentStat';
import LikeStat from '~/components/ArticleCard/LikeStat';
import { Separator } from '~/components/Common';
import { useStripHtml } from '~/hooks';
import { flex, fontCss, lineClamp, palettes } from '~/styles/utils';
import { routes, timeAgo } from '~/utils';

interface HotArticleCardProps {
  article: ArticleSummary;
}

export const HotArticleCard = memo((props: HotArticleCardProps) => {
  const { article } = props;
  const {
    boardTitle: categoryTitle,
    title: articleTitle,
    content,
    createdAt,
    nickname,
    likeCount,
    commentCount,
    postId: articleId,
  } = article;
  const strippedHtml = useStripHtml(content);

  return (
    <ArticleCardLink href={routes.article.detail(articleId)}>
      <div css={[headerCss, { marginBottom: 10 }]}>
        <div css={categoryCss}>
          <strong>{categoryTitle}</strong>
        </div>
        <div css={statsCss}>
          <LikeStat count={likeCount} />
          <CommentStat count={commentCount} />
        </div>
      </div>

      <h2 css={[articleTitleCss, { marginBottom: 4 }]}>{articleTitle}</h2>

      <p css={[contentCss, { marginBottom: 10 }]}>{strippedHtml}</p>

      <div css={metaCss}>
        <span>{timeAgo(createdAt)}</span>
        <Separator orientation="vertical" width={2} height={14} />
        <span>{nickname}</span>
      </div>
    </ArticleCardLink>
  );
});
HotArticleCard.displayName = 'HotArticleCard';

const clampCss = css(
  {
    width: '100%',
    wordBreak: 'break-all',
  },
  lineClamp(1)
);

const articleTitleCss = css(fontCss.style.B14, clampCss);

const categoryCss = css({ color: palettes.point.purple }, fontCss.style.B18);

const contentCss = css(fontCss.style.R14, clampCss);

const headerCss = css(flex('center', 'space-between', 'row', 16));

const statsCss = css(flex('center', '', 'row', 8));

const metaCss = css(fontCss.style.B14, flex('center', '', 'row', 8));
