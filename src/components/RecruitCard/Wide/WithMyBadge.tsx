import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, palettes } from '~/styles/utils';

interface WithBadgeProps {
  children: ReactNode;
}

const WithMyBadge = (props: WithBadgeProps) => {
  const { children } = props;
  return (
    <div css={selfCss}>
      <span css={badgeCss}>My</span>
      {children}
    </div>
  );
};

const selfCss = css(
  {
    maxWidth: '75%',
  },
  flex('flex-start', '', 'column', 3)
);

const badgeCss = css({
  padding: '4px 16px',
  background: palettes.black,
  display: 'inline-block',
  borderRadius: 16,
  fontSize: 14,
  color: palettes.white,
});

export default WithMyBadge;
