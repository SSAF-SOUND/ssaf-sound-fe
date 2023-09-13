import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface RecruitApplyFormFieldTitleProps {
  children?: ReactNode;
  className?: string;
}

export const RecruitApplyFormFieldTitle = (
  props: RecruitApplyFormFieldTitleProps
) => {
  return <h3 css={selfCss} {...props} />;
};

const selfCss = css({ color: palettes.white }, fontCss.style.B16);
