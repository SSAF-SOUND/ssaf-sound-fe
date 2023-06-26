import type { ReactNode } from 'react';

import { css } from '@emotion/react';

interface VisuallyHiddenProps {
  children: ReactNode;
}

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  return <span css={selfCss}>{props.children}</span>;
};

export default VisuallyHidden;

const selfCss = css({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: `rect(0, 0, 0, 0)`,
  whiteSpace: `nowrap`,
  borderWidth: 0,
});
