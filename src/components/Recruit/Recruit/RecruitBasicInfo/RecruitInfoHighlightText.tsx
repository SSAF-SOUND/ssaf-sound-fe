import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

interface RecruitHighlightTextProps {
  children?: ReactNode;
}

export const RecruitInfoHighlightText = (props: RecruitHighlightTextProps) => {
  return <strong css={selfCss} {...props} />;
};

const selfCss = css({ color: palettes.recruit.default });
