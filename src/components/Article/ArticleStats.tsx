import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

import { Icon, IconButton } from '~/components/Common';
import { useLikeArticle, useScrapArticle } from '~/services/article';
import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

const iconSize = 20;
const iconButtonSize = 24;

interface ArticleStatsProps {
  articleDetail: ArticleDetail;
  className?: string;
}

const ArticleStats = (props: ArticleStatsProps) => {
  const { articleDetail, className } = props;
  const { liked, likeCount, scraped, scrapCount, commentCount } = articleDetail;
  const { postId: articleId } = articleDetail;
  const { mutateAsync: likeArticle, isLoading: isTogglingLike } =
    useLikeArticle(articleId);
  const { mutateAsync: scrapArticle, isLoading: isTogglingScrap } =
    useScrapArticle(articleId);

  const handleClickLike = async () => {
    try {
      await likeArticle();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const handleClickScrap = async () => {
    try {
      await scrapArticle();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss} className={className}>
      <div css={interestStatCss}>
        <div css={iconContainerCss}>
          <LikeButton
            pressed={liked}
            onClick={handleClickLike}
            disabled={isTogglingLike}
          />
          <strong>{likeCount}</strong>
        </div>

        <div css={iconContainerCss}>
          <ScrapButton
            pressed={scraped}
            onClick={handleClickScrap}
            disabled={isTogglingScrap}
          />
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

interface InterestButtonProps {
  pressed: boolean;
  onClick?: () => void;
  disabled: boolean;
}

const LikeButton = (props: InterestButtonProps) => {
  const { pressed, ...restProps } = props;
  return (
    <IconButton
      theme="primary"
      css={iconContainerCss}
      size={iconButtonSize}
      {...restProps}
    >
      <Icon
        name={pressed ? 'like' : 'like.outline'}
        color={palettes.primary.default}
        size={iconSize}
      />
    </IconButton>
  );
};

const ScrapButton = (props: InterestButtonProps) => {
  const { pressed, ...restProps } = props;
  return (
    <IconButton
      theme="primary"
      css={iconContainerCss}
      size={iconButtonSize}
      {...restProps}
    >
      <Icon
        name={pressed ? 'bookmark' : 'bookmark.outline'}
        color={palettes.primary.default}
        size={iconSize}
      />
    </IconButton>
  );
};

export default ArticleStats;

const selfCss = css(flex('center', 'space-between', 'row'), fontCss.style.B14);

const interestStatCss = css(
  { color: palettes.primary.default },
  flex('center', '', 'row', 8)
);

const iconContainerCss = css(inlineFlex('center', '', 'row', 2));

const commentStatCss = css(
  { color: palettes.secondary.default },
  flex('center')
);
