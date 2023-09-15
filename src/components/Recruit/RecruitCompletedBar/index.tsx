import { css } from '@emotion/react';

import { flex, fontCss, palettes } from '~/styles/utils';

export interface RecruitCompletedBarProps {
  className?: string;
}

export const RecruitCompletedBar = (props: RecruitCompletedBarProps) => {
  return (
    <div css={selfCss} {...props}>
      모집 종료되었습니다
    </div>
  );
};
export const recruitCompletedBarHeight = 48;

const selfCss = css(
  {
    height: recruitCompletedBarHeight,
    backgroundColor: palettes.majorDark,
    color: palettes.recruit.default,
  },
  fontCss.style.B16,
  flex('center', 'center', 'row')
);
