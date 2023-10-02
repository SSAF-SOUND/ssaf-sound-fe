import type { ArticleSummary } from '~/services/article';

import { css } from '@emotion/react';
import { memo } from 'react';

import ArticleCardLink from '~/components/ArticleCard/ArticleCardLink';
import CommentStat from '~/components/ArticleCard/CommentStat';
import LikeStat from '~/components/ArticleCard/LikeStat';
import { Separator } from '~/components/Common/Separator';
import { useStripHtml } from '~/hooks';
import { flex, fontCss, lineClamp, palettes } from '~/styles/utils';
import { routes, timeAgo } from '~/utils';

interface ArticleCardProps {
  article: ArticleSummary;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
  const { article } = props;
  const {
    title,
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
      <h2 css={[titleCss, { marginBottom: 2 }]}>{title}</h2>

      <p css={[contentCss, { marginBottom: 24 }]}>{strippedHtml}</p>

      <div css={footerCss}>
        <div css={metaCss}>
          <span>{timeAgo(createdAt)}</span>
          <Separator
            css={separatorCss}
            orientation="vertical"
            width={2}
            height={14}
          />
          <span>{nickname}</span>
        </div>
        <div css={statsCss}>
          <LikeStat count={likeCount} />
          <CommentStat count={commentCount} />
        </div>
      </div>
    </ArticleCardLink>
  );
});
ArticleCard.displayName = 'ArticleCard';

const clampCss = css(
  {
    width: '100%',
    wordBreak: 'break-all',
  },
  lineClamp(1)
);

const titleCss = css(fontCss.style.B18, clampCss);

const contentCss = css(fontCss.style.R14, clampCss);

const footerCss = css(flex('center', 'space-between', 'row'));

const separatorCss = css({
  backgroundColor: palettes.font.blueGrey,
});

const metaCss = css(
  { color: palettes.font.blueGrey },
  fontCss.style.B12,
  flex('center', '', 'row', 5)
);

const statsCss = css(flex('center', '', 'row', 8));
