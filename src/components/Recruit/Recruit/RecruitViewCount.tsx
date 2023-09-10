import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

export interface RecruitViewCountProps {
  children?: ReactNode;
  className?: string;
}

export const RecruitViewCount = (props: RecruitViewCountProps) => {
  const { children, ...restProps } = props;
  return (
    <span {...restProps} css={selfCss}>
      조회수 {children}
    </span>
  );
};

const selfCss = css({ color: palettes.font.blueGrey }, fontCss.style.R12);
