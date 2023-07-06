import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import {
  fontCss,
  getRecruitThemeByCategory,
  themeColorVars,
} from '~/styles/utils';
import { getDateDiff } from '~/utils';

export interface DdayProps {
  recruitEnd: string;
  category: RecruitCategory;
}

const Dday = (props: DdayProps) => {
  const { recruitEnd = '2023-06-30', category = 'study' } = props;

  const diff = getDateDiff(new Date(recruitEnd));
  const isAbleDate = diff >= 0;
  const dDay = isAbleDate ? `D - ${diff}` : '모집 완료';

  return (
    <span css={[textCss]} data-theme={getRecruitThemeByCategory(category)}>
      {dDay}
    </span>
  );
};

const textCss = css(fontCss.style.B20, {
  color: themeColorVars.mainColor.var,
});

export default Dday;
