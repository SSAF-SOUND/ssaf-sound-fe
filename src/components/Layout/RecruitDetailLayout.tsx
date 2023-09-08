import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { titleBarHeight } from '~/styles/utils';

interface RecruitDetailLayoutProps {
  children: ReactNode;
  className?: string;
}

export const RecruitDetailLayout = (props: RecruitDetailLayoutProps) => {
  return <div css={selfCss} {...props} />;
};

const selfPaddingY = titleBarHeight + 12;
const selfPaddingX = 15;
const selfCss = css({
  padding: `${selfPaddingY}px ${selfPaddingX}px`,
});
