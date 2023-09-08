import type { SerializedStyles } from '@emotion/react';
import type { RecruitCategoryName } from '~/services/recruit';

import { css } from '@emotion/react';

import { getRecruitThemeByCategory } from '~/services/recruit';
import { fontCss, inlineFlex, themeColorVars } from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface DdayProps {
  endDate: string;
  category: RecruitCategoryName;
  size?: 'sm' | 'md';
}

export type DdaySize = 'sm' | 'md';

export const Dday = (props: DdayProps) => {
  const { endDate = '2023-06-30', category, size = 'sm' } = props;

  const diff = getDateDiff(new Date(endDate));
  const expired = diff > 0;
  const dDay = expired ? `D - ${diff}` : '모집 완료';

  return (
    <span
      css={[selfCss, textCss, sizeCss[size]]}
      data-theme={getRecruitThemeByCategory(category)}
    >
      {dDay}
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
