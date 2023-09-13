import type { RecruitCategoryName } from '~/services/recruit';

import { css } from '@emotion/react';

import {
  getDisplayCategoryName,
  getRecruitThemeByCategory,
} from '~/services/recruit';
import { palettes, themeColorVars } from '~/styles/utils';

import { RecruitBadgeBase } from './RecruitBadgeBase';

interface RecruitCategoryBadgeProps {
  category: RecruitCategoryName;
}

export const RecruitCategoryBadge = (props: RecruitCategoryBadgeProps) => {
  const { category } = props;

  const recruitTheme = getRecruitThemeByCategory(category);
  const categoryName = getDisplayCategoryName(category);
  return (
    <RecruitBadgeBase css={selfCss} data-theme={recruitTheme}>
      {categoryName}
    </RecruitBadgeBase>
  );
};

const selfCss = css({
  backgroundColor: themeColorVars.mainDarkColor.var,
  color: palettes.white,
});
