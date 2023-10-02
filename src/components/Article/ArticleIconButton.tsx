import type { IconNames } from '~/components/Common/Icon';
import type { IconButtonProps } from '~/components/Common/IconButton';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { colorMix } from '~/styles/utils';

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
  const {
    iconName,
    iconColor = '',
    theme,
    label,
    disabled,
    ...restProps
  } = props;
  const color = disabled ? colorMix('50%', iconColor) : iconColor;

  return (
    <IconButton
      {...restProps}
      theme={theme}
      size={iconButtonSize}
      disabled={disabled}
    >
      <Icon name={iconName} size={iconSize} label={label} color={color} />
    </IconButton>
  );
};

const iconSize = 24;
const iconButtonSize = iconSize + 4;
