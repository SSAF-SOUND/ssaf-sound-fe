import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

import { RecruitBadgeBase } from './RecruitBadgeBase';

export const MyRecruitBadge = () => {
  return <RecruitBadgeBase css={selfCss}>My</RecruitBadgeBase>;
};

const selfCss = css(
  { backgroundColor: palettes.font.grey, color: palettes.white },
  fontCss.style.B14
);
