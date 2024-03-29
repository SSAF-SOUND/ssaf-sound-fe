import type { CSSProperties, ReactNode } from 'react';

import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

interface MessageBoxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const MessageBox = (props: MessageBoxProps) => {
  return <div css={selfCss} {...props} />;
};

export default MessageBox;
const selfCss = css({
  backgroundColor: palettes.white,
  border: `1px solid ${palettes.grey3}`,
});
