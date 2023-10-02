import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';

interface ReplyButtonProps {
  onClick: () => void;
}

const ReplyButton = (props: ReplyButtonProps) => {
  const { onClick } = props;

  return (
    <IconButton size={commentIconSize.iconButton} onClick={onClick}>
      <Icon name="chat.rect" size={commentIconSize.icon} />
    </IconButton>
  );
};

export default ReplyButton;
