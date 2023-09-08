import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface RecruitTitleProps {
  children: ReactNode;
  className?: string;
}

export const RecruitTitle = (props: RecruitTitleProps) => {
  return <h2 css={selfCss} {...props} />;
};

const selfCss = css({ color: palettes.white }, fontCss.style.B28);
