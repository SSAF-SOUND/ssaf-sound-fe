import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import { getRecruitThemeByCategory } from '~/services/recruit';
import { fontCss, themeColorVars } from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface DdayProps extends ComponentPropsWithoutRef<'span'> {
  recruitEnd: string;
  category: RecruitCategory;
  size?: 'sm' | 'md';
}

type DdaySizes = 'sm' | 'md';

const Dday = (props: DdayProps) => {
  const {
    recruitEnd = '2023-06-30',
    category = 'project',
    size = 'md',
    ...restProps
  } = props;

  const diff = getDateDiff(new Date(recruitEnd));
  const isAbleDate = diff >= 0;
  const dDay = isAbleDate ? `D - ${diff}` : '모집 완료';

  return (
    <span
      css={[textCss, sizeCss[size]]}
      data-theme={getRecruitThemeByCategory(category)}
      {...restProps}
    >
      {dDay}
    </span>
  );
};

const textCss = css(fontCss.family.auto, {
  color: themeColorVars.mainColor.var,
});

const sizeCss: Record<DdaySizes, SerializedStyles> = {
  sm: css(fontCss.style.B16),
  md: css(fontCss.style.B20),
};

export default Dday;
