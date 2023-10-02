import { css } from '@emotion/react';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
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
  isRecruitComment?: boolean;
}

const LikeLayer = (props: LikeButtonProps) => {
  const {
    liked,
    likeCount,
    articleId,
    commentId,
    isSignedIn,
    isRecruitComment,
  } = props;
  const { openSignInGuideModal } = useSignInGuideModal();
  const iconName = liked ? 'like' : 'like.outline';
  const { mutateAsync: likeArticleComment, isLoading: isLikingArticleComment } =
    useLikeComment({ commentId, articleId }, { recruit: isRecruitComment });

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
