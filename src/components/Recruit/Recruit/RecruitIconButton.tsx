import type { IconButtonProps, IconNames } from '~/components/Common';

import { Icon, IconButton } from '~/components/Common';

interface RecruitIconButtonProps {
  iconName: IconNames;
  className?: string;
  onClick?: () => void;
  theme?: IconButtonProps['theme'];
  iconColor?: string;
  label?: string;
}

export const RecruitIconButton = (props: RecruitIconButtonProps) => {
  const { iconName, iconColor, theme, label, ...restProps } = props;

  return (
    <IconButton {...restProps} theme={theme} size={iconButtonSize}>
      <Icon name={iconName} size={iconSize} label={label} color={iconColor} />
    </IconButton>
  );
};

interface RecruitIconProps
  extends Pick<RecruitIconButtonProps, 'iconName' | 'className' | 'label'> {
  color?: string;
}
export const RecruitIcon = (props: RecruitIconProps) => {
  const { iconName } = props;
  return <Icon name={iconName} {...props} />;
};

const iconSize = 24;
const iconButtonSize = iconSize + 4;
