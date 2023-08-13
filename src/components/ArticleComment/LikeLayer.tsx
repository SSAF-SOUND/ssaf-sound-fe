import { css } from '@emotion/react';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';
import { useSignInGuideModal } from '~/hooks';
import { useLikeArticleComment } from '~/services/articleComment';
import { flex, fontCss } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

interface LikeButtonProps {
  liked: boolean;
  likeCount: number;
  articleId: number;
  commentId: number;
  isSignedIn: boolean;
}

const LikeLayer = (props: LikeButtonProps) => {
  const { liked, likeCount, articleId, commentId, isSignedIn } = props;
  const { openSignInGuideModal } = useSignInGuideModal();
  const iconName = liked ? 'like' : 'like.outline';
  const { mutateAsync: likeArticleComment, isLoading: isLikingArticleComment } =
    useLikeArticleComment({ commentId, articleId });

  const handleLikeArticleComment = async () => {
    if (!isSignedIn) {
      openSignInGuideModal();
      return;
    }

    try {
      await likeArticleComment();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <IconButton
        size={commentIconSize.iconButton}
        onClick={handleLikeArticleComment}
        disabled={isLikingArticleComment}
      >
        <Icon name={iconName} size={commentIconSize.icon} />
      </IconButton>
      <strong>{likeCount}</strong>
    </div>
  );
};

export default LikeLayer;
const selfCss = css(flex('center', '', 'row', 2), fontCss.style.R14);
