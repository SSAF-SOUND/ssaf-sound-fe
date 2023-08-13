import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';

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
