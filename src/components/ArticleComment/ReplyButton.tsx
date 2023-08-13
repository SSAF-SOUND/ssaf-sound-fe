import type { IconButtonProps } from '~/components/Common';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';

interface ReplyButtonProps extends IconButtonProps {}

const ReplyButton = (props: ReplyButtonProps) => {
  return (
    <IconButton size={commentIconSize.iconButton} {...props}>
      <Icon name="chat.rect" size={commentIconSize.icon} />
    </IconButton>
  );
};

export default ReplyButton;
