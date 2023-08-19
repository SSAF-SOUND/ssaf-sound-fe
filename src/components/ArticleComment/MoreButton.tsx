import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon, IconButton } from '~/components/Common';

interface MoreButtonProps {}

const MoreButton = (props: MoreButtonProps) => {
  return (
    <IconButton size={commentIconSize.iconButton}>
      <Icon name="more" size={commentIconSize.icon} />
    </IconButton>
  );
};

export default MoreButton;
