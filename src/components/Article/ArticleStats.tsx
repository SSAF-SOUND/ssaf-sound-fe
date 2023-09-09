import type { ArticleDetail } from '~/services/article';

import { css } from '@emotion/react';

import { ArticleIconButton } from '~/components/Article/ArticleIconButton';
import { Icon } from '~/components/Common';
import { useSignInGuideModal } from '~/hooks';
import { useLikeArticle, useScrapArticle } from '~/services/article';
import { useArticleComments } from '~/services/articleComment';
import { countAllComments } from '~/services/comment/utils';
import { useMyInfo } from '~/services/member';
import { flex, fontCss, inlineFlex, palettes, Theme } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

const iconSize = 24;

interface ArticleStatsProps {
  articleDetail: ArticleDetail;
  className?: string;
}

const ArticleStats = (props: ArticleStatsProps) => {
  const { articleDetail, className } = props;
  const { data: comments } = useArticleComments(articleDetail.postId);
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const { openSignInGuideModal } = useSignInGuideModal();
  const { liked, likeCount, scraped, scrapCount } = articleDetail;
  const { postId: articleId } = articleDetail;
  const { mutateAsync: likeArticle, isLoading: isTogglingLike } =
    useLikeArticle(articleId);
  const { mutateAsync: scrapArticle, isLoading: isTogglingScrap } =
    useScrapArticle(articleId);

  const commentCount = comments && countAllComments(comments);

  const handleClickLike = async () => {
    if (!isSignedIn) {
      openSignInGuideModal();
      return;
    }

    try {
      await likeArticle();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const handleClickScrap = async () => {
    if (!isSignedIn) {
      openSignInGuideModal();
      return;
    }

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
          <strong css={countCss}>{likeCount}</strong>
        </div>

        <div css={iconContainerCss}>
          <ScrapButton
            pressed={scraped}
            onClick={handleClickScrap}
            disabled={isTogglingScrap}
          />
          <strong css={countCss}>{scrapCount}</strong>
        </div>
      </div>

      <div css={commentStatCss}>
        <div css={[iconContainerCss, { gap: 6 }]}>
          <Icon name="chat.rect" size={iconSize} />
          <strong css={countCss}>{commentCount}</strong>
        </div>
      </div>
    </div>
  );
};

interface InterestButtonProps {
  pressed: boolean;
  onClick?: () => void;
  disabled: boolean;
  theme?: Extract<Theme, Theme.PRIMARY | Theme.SECONDARY>;
}

const LikeButton = (props: InterestButtonProps) => {
  const { pressed, theme = Theme.PRIMARY, ...restProps } = props;
  return (
    <ArticleIconButton
      iconName={pressed ? 'like' : 'like.outline'}
      label="좋아요"
      iconColor={palettes.primary.default}
      theme={theme}
      {...restProps}
    />
  );
};

export const ScrapButton = (props: InterestButtonProps) => {
  const { pressed, theme = Theme.PRIMARY, ...restProps } = props;
  return (
    <ArticleIconButton
      iconName={pressed ? 'bookmark' : 'bookmark.outline'}
      label="스크랩"
      iconColor={palettes.primary.default}
      theme={theme}
      {...restProps}
    />
  );
};

export default ArticleStats;

const selfCss = css(flex('center', 'space-between', 'row'), fontCss.style.B14);

const interestStatCss = css(
  { color: palettes.primary.default },
  flex('center', '', 'row', 8)
);

const countCss = css(fontCss.style.B16);

const iconContainerCss = css(inlineFlex('center', '', 'row', 2));

const commentStatCss = css(
  { color: palettes.secondary.default },
  flex('center')
);
