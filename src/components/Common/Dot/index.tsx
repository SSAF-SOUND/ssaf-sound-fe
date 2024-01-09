import { css } from '@emotion/react';

import { inlineFlex, themeColorVars } from '~/styles/utils';

type DotTheme = 'primary' | 'secondary' | 'recruit';
type DotSize = 'sm' | 'md' | 'lg';

export interface DotProps {
  theme?: DotTheme;
  size?: DotSize;
  className?: string;
}

export const Dot = (props: DotProps) => {
  const { theme = 'primary', size = 'sm', className } = props;
  return (
    <div
      data-theme={theme}
      className={className}
      css={[selfCss, themeCss, sizeCss[size]]}
    />
  );
};

const selfCss = css({ borderRadius: '50%' }, inlineFlex());

const themeCss = css({
  backgroundColor: themeColorVars.mainDarkColor.var,
});

const sizeCss = {
  sm: css({ width: 10, height: 10 }),
  md: css({ width: 16, height: 16 }),
  lg: css({ width: 24, height: 24 }),
};
