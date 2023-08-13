import type { IconButtonProps } from '~/components/Common';

import { css } from '@emotion/react';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

interface LikeButtonProps {
  liked: boolean;
  likeCount: number;
  onClickLikeButton: () => void;
}

const LikeLayer = (props: LikeButtonProps) => {
  const { liked, likeCount, onClickLikeButton } = props;
  const iconName = liked ? 'like' : 'like.outline';

  return (
    <div css={selfCss}>
      <IconButton size={commentIconSize.iconButton} onClick={onClickLikeButton}>
        <Icon name={iconName} size={commentIconSize.icon} />
      </IconButton>
      <strong>{likeCount}</strong>
    </div>
  );
};

export default LikeLayer;
const selfCss = css(flex('center', '', 'row',2), fontCss.style.R14);
