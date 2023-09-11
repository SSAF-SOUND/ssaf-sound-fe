import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, inlineFlex } from '~/styles/utils';

export interface RecruitBadgeBaseProps {
  className?: string;
  children: ReactNode;
}

export const RecruitBadgeBase = (props: RecruitBadgeBaseProps) => {
  return <div css={selfCss} {...props} />;
};

const selfCss = css(
  {
    minWidth: 52,
    height: 24,
    borderRadius: 20,
  },
  fontCss.style.B12,
  fontCss.family.auto,
  inlineFlex('center', 'center')
);
