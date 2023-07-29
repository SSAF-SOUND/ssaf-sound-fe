import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

import { Icon, IconButton } from '~/components/Common';
import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';

const iconSize = 20;
const iconButtonSize = 24;

interface ArticleStatsProps {
  articleDetail: ArticleDetail;
  className?: string;
}

const ArticleStats = (props: ArticleStatsProps) => {
  const { articleDetail, className } = props;
  const { liked, likeCount, scraped, scrapCount, commentCount } = articleDetail;

  // TODO
  const handleClickLike = () => {};
  const handleClickScrap = () => {};

  return (
    <div css={selfCss} className={className}>
      <div css={interestStatCss}>
        <div css={iconContainerCss}>
          <IconButton
            theme="primary"
            css={iconContainerCss}
            size={iconButtonSize}
          >
            <Icon
              name={liked ? 'like' : 'like.outline'}
              color={palettes.primary.default}
              size={iconSize}
            />
          </IconButton>
          <strong>{likeCount}</strong>
        </div>

        <div css={iconContainerCss}>
          <IconButton
            theme="primary"
            css={iconContainerCss}
            size={iconButtonSize}
          >
            <Icon
              name={scraped ? 'bookmark' : 'bookmark.outline'}
              color={palettes.primary.default}
              size={iconSize}
            />
          </IconButton>
          <strong>{scrapCount}</strong>
        </div>
      </div>

      <div css={commentStatCss}>
        <div css={[iconContainerCss, { gap: 6 }]}>
          <Icon name="chat.rect" size={iconSize} />
          <strong>{commentCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default ArticleStats;

const selfCss = css(flex('center', 'space-between', 'row'), fontCss.style.B14);

const interestStatCss = css(
  { color: palettes.primary.default },
  flex('center', '', 'row', 8)
);

const iconContainerCss = css(inlineFlex('center', '', 'row', 2));

const commentStatCss = css({ color: palettes.secondary.default });
