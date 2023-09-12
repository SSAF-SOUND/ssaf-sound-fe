import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { memo } from 'react';

import { Theme, fontCss, inlineFlex, themeColorVars } from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface RecruitDeadlineProps {
  endDate: string;
  className?: string;
  theme?: Theme.PRIMARY | Theme.SECONDARY;
  size?: 'sm' | 'md';
  completed?: boolean;
}

export type RecruitDeadlineSize = 'sm' | 'md';

export const RecruitDeadline = memo((props: RecruitDeadlineProps) => {
  const {
    endDate,
    theme = Theme.PRIMARY,
    size = 'sm',
    completed = false,
    ...restProps
  } = props;
  const displayText = getDeadlineText(endDate, {
    completed,
  });

  return (
    <span
      css={[selfCss, textCss, sizeCss[size]]}
      data-theme={theme}
      {...restProps}
    >
      {displayText}
    </span>
  );
});
RecruitDeadline.displayName = 'RecruitDeadline';

const selfCss = css(inlineFlex('center', 'center'));

const textCss = css(fontCss.family.auto, {
  color: themeColorVars.mainDarkColor.var,
});

const sizeCss: Record<RecruitDeadlineSize, SerializedStyles> = {
  sm: css(fontCss.style.B16),
  md: css(fontCss.style.B20),
};

interface GetDeadlineTextOptions {
  completed: boolean;
}

const completedText = '모집 완료';

const getDeadlineText = (
  endDate: string,
  options: Partial<GetDeadlineTextOptions> = {}
) => {
  const { completed = false } = options;
  if (completed) {
    return completedText;
  }

  // 데드라인은 `endDate`의 23:59:59까지
  const diff = getDateDiff(dayjs(endDate).endOf('day'));

  const isDDay = diff === 0;
  const expired = diff < 0;
  const tooLong = diff > 999;

  if (tooLong) {
    return 'D - 999+'
  }

  if (expired) {
    return completedText;
  }

  if (isDDay) {
    return 'D - Day';
  }

  return `D - ${diff}`;
};
