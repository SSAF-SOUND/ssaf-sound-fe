import type { IconButtonProps, IconNames } from '~/components/Common';

import { Icon, IconButton } from '~/components/Common';

interface ArticleIconButtonProps {
  iconName: IconNames;
  className?: string;
  onClick?: () => void;
  theme?: IconButtonProps['theme'];
  iconColor?: string;
  label?: string;
  disabled?: boolean;
}

export const ArticleIconButton = (props: ArticleIconButtonProps) => {
  const { iconName, iconColor, theme, label, ...restProps } = props;

  return (
    <IconButton {...restProps} theme={theme} size={iconButtonSize}>
      <Icon name={iconName} size={iconSize} label={label} color={iconColor} />
    </IconButton>
  );
};

const iconSize = 24;
const iconButtonSize = iconSize + 4;
