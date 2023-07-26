import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, palettes } from '~/styles/utils';

interface ToolbarProps {
  children: ReactNode;
  className?: string;
}

const ToolBar = (props: ToolbarProps) => {
  return <div css={selfCss} {...props} />;
};

export default ToolBar;

const selfCss = css(
  {
    backgroundColor: palettes.white,
    border: `1px solid ${palettes.grey3}`,
    color: palettes.black,
    height: 50,
    padding: '0 10px',
  },
  flex('center', '', 'row', 10)
);
