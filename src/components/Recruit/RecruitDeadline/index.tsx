import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';

import { Theme, fontCss, inlineFlex, themeColorVars } from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface RecruitDeadlineProps {
  className?: string;
  endDate: string;
  theme?: Extract<Theme, Theme.PRIMARY | Theme.SECONDARY>;
  size?: 'sm' | 'md';
}

export type RecruitDeadlineSize = 'sm' | 'md';

const getDeadlineText = (endDate: string) => {
  // 데드라인은 `endDate`의 23:59:59까지
  const diff = getDateDiff(dayjs(endDate).endOf('day'));

  const isDDay = diff === 0;
  const expired = diff < 0;

  if (isDDay) {
    return 'D - Day';
  }

  if (expired) {
    return '모집 완료';
  }

  return `D - ${diff}`;
};

export const RecruitDeadline = (props: RecruitDeadlineProps) => {
  const { endDate, theme = Theme.PRIMARY, size = 'sm', ...restProps } = props;
  const displayText = getDeadlineText(endDate);

  return (
    <span
      css={[selfCss, textCss, sizeCss[size]]}
      data-theme={theme}
      {...restProps}
    >
      {displayText}
    </span>
  );
};

const selfCss = css(inlineFlex('center', 'center'));

const textCss = css(fontCss.family.auto, {
  color: themeColorVars.mainDarkColor.var,
});

const sizeCss: Record<RecruitDeadlineSize, SerializedStyles> = {
  sm: css(fontCss.style.B16),
  md: css(fontCss.style.B20),
};
