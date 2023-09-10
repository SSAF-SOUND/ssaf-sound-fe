import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';

import { Theme, fontCss, inlineFlex, themeColorVars } from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface DdayProps {
  className?: string;
  endDate: string;
  theme?: Extract<Theme, Theme.PRIMARY | Theme.SECONDARY>;
  size?: 'sm' | 'md';
}

export type DdaySize = 'sm' | 'md';

const getDisplayText = (endDate: string) => {
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

export const Dday = (props: DdayProps) => {
  const { endDate, theme = Theme.PRIMARY, size = 'sm', ...restProps } = props;
  const displayText = getDisplayText(endDate);

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

const sizeCss: Record<DdaySize, SerializedStyles> = {
  sm: css(fontCss.style.B16),
  md: css(fontCss.style.B20),
};
