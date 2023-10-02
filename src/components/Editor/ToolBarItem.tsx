import type { IconNames } from '~/components/Common/Icon';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Theme } from '~/styles/utils';

interface CustomToolbarItemProps {
  name: IconNames;
  onClick: () => void;
}

const ToolBarItem = (props: CustomToolbarItemProps) => {
  const { name, onClick } = props;
  return (
    <IconButton theme={Theme.BLACK} size={32} onClick={onClick}>
      <Icon name={name} size={24} />
    </IconButton>
  );
};

export default ToolBarItem;
