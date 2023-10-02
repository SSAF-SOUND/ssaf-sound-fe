import { ClipLoader } from 'react-spinners';

import { commentIconSize } from '~/components/ArticleComment/utils';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { palettes } from '~/styles/utils';

interface MoreButtonProps {
  onClick: () => void;
  loading?: boolean;
}

const MoreButton = (props: MoreButtonProps) => {
  const { onClick, loading = false } = props;

  if (loading) {
    return <ClipLoader color={palettes.font.blueGrey} size={16} />;
  }

  return (
    <IconButton size={commentIconSize.iconButton} onClick={onClick}>
      <Icon name="more" size={commentIconSize.icon} />
    </IconButton>
  );
};

export default MoreButton;
