import type { IconButtonProps } from '~/components/Common';

import { css } from '@emotion/react';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';
import { useSignInGuideModal } from '~/hooks';
import { useLikeComment } from '~/services/comment';
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
  const { mutateAsync: likeComment, isLoading: isLikingComment } =
    useLikeComment({ commentId, articleId });

  const handleLikeComment = async () => {
    if (!isSignedIn) {
      openSignInGuideModal();
      return;
    }

    try {
      await likeComment();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <IconButton
        size={commentIconSize.iconButton}
        onClick={handleLikeComment}
        disabled={isLikingComment}
      >
        <Icon name={iconName} size={commentIconSize.icon} />
      </IconButton>
      <strong>{likeCount}</strong>
    </div>
  );
};

export default LikeLayer;
const selfCss = css(flex('center', '', 'row', 2), fontCss.style.R14);
