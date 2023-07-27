import type { IconNames } from '~/components/Common';

import { Icon, IconButton } from '~/components/Common';

interface CustomToolbarItemProps {
  name: IconNames;
  onClick: () => void;
}

const ToolBarItem = (props: CustomToolbarItemProps) => {
  const { name, onClick } = props;
  return (
    <IconButton theme="black" size={32} onClick={onClick}>
      <Icon name={name} size={24} />
    </IconButton>
  );
};

export default ToolBarItem;