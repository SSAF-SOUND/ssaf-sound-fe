import { css } from '@emotion/react';

import { inlineFlex, palettes } from '~/styles/utils';

type DotTheme = 'primary' | 'secondary';
type DotSize = 'sm' | 'md' | 'lg';

interface DotProps {
  theme?: DotTheme;
  size?: DotSize;
}

const Dot = (props: DotProps) => {
  const { theme = 'primary', size = 'sm' } = props;
  return <div css={[selfCss, themeCss[theme], sizeCss[size]]} />;
};

export default Dot;

const selfCss = css({ borderRadius: '50%' }, inlineFlex());

const themeCss = {
  primary: css({
    backgroundColor: palettes.primary.darken,
  }),
  secondary: css({
    backgroundColor: palettes.secondary.default,
  }),
};

const sizeCss = {
  sm: css({ width: 6, height: 6 }),
  md: css({ width: 10, height: 10 }),
  lg: css({ width: 16, height: 16 }),
};
