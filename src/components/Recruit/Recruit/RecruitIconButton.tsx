import type { IconButtonProps, IconNames } from '~/components/Common';

import { Icon, IconButton } from '~/components/Common';

interface RecruitIconButtonProps {
  iconName: IconNames;
  className?: string;
  onClick?: () => void;
  theme?: IconButtonProps['theme'];
  label?: string;
}

export const RecruitIconButton = (props: RecruitIconButtonProps) => {
  const { iconName, theme, label, ...restProps } = props;
  return (
    <IconButton {...restProps} theme={theme} size={iconButtonSize}>
      <Icon name={iconName} size={iconSize} label={label} />
    </IconButton>
  );
};

const iconSize = 24;
const iconButtonSize = iconSize + 4;
