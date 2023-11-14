import type { ArticleSummary } from '~/services/article/utils';

import { css } from '@emotion/react';
import { memo } from 'react';

import articleCardImageFallback from '~/assets/images/lunch-image-fallback.png';
import ArticleCardLink from '~/components/ArticleCard/ArticleCardLink';
import CommentStat from '~/components/ArticleCard/CommentStat';
import LikeStat from '~/components/ArticleCard/LikeStat';
import { ImageWithFallback } from '~/components/Common/ImageWithFallback';
import { Separator } from '~/components/Common/Separator';
import { useStripHtml } from '~/hooks';
import {
  deletedUserDisplayNickname,
  isDeletedUser,
} from '~/services/member/utils/isDeletedUser';
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
    thumbnail,
  } = article;
  const strippedHtml = useStripHtml(content);
  const displayNickname = isDeletedUser({ nickname }) ? (
    <span css={{ color: palettes.grey3 }}>{deletedUserDisplayNickname}</span>
  ) : (
    <span>{nickname}</span>
  );

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

      <div css={flex('', 'space-between', 'row', 16)}>
        <div>
          <h2 css={[articleTitleCss, { marginBottom: 4 }]}>{articleTitle}</h2>
          <p
            css={[contentCss, { marginBottom: 16 }]}
            dangerouslySetInnerHTML={{ __html: strippedHtml }}
          />
        </div>
        {thumbnail && (
          <div css={flex('center')}>
            <ImageWithFallback
              fallbackSrc={articleCardImageFallback.src}
              src={thumbnail}
              alt=""
              width={70}
              height={70}
              css={thumbnailCss}
            />
          </div>
        )}
      </div>

      <div css={metaCss}>
        <span>{timeAgo(createdAt)}</span>
        <Separator orientation="vertical" width={2} height={14} />
        {displayNickname}
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

const articleTitleCss = css(
  fontCss.style.B14,
  fontCss.family.pretendard,
  clampCss
);

const categoryCss = css({ color: palettes.point.purple }, fontCss.style.B18);

const contentCss = css(fontCss.style.R14, fontCss.family.pretendard, clampCss);

const headerCss = css(flex('center', 'space-between', 'row', 16));

const statsCss = css(flex('center', '', 'row', 8));

const metaCss = css(fontCss.style.B14, flex('center', '', 'row', 8));

const thumbnailCss = css({
  borderRadius: 12,
  border: `1px solid ${palettes.font.blueGrey}`,
});
