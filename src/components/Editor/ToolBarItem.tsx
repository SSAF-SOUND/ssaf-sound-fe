import type { IconNames } from '~/components/Common/Icon';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Theme } from '~/styles/utils';

interface CustomToolbarItemProps {
  name: IconNames;
  onClick: () => void;
  disabled?: boolean;
}

const ToolBarItem = (props: CustomToolbarItemProps) => {
  const { name, onClick, disabled = false } = props;
  return (
    <IconButton
      theme={Theme.BLACK}
      size={32}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={name} size={24} />
    </IconButton>
  );
};

export default ToolBarItem;
