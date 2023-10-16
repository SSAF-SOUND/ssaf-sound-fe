import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, lineClamp, palettes } from '~/styles/utils';

interface RecruitCardTitleProps {
  children: ReactNode;
  showLineCount?: number;
}
export const RecruitCardTitle = (props: RecruitCardTitleProps) => {
  const { showLineCount = 1, ...restProps } = props;
  return <h3 css={[selfCss, lineClamp(showLineCount)]} {...restProps} />;
};

const selfCss = css(
  { color: palettes.font.grey, wordBreak: 'break-all' },
  fontCss.style.B14,
  fontCss.family.pretendard
);
