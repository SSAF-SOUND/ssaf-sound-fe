import type { RecruitCategoryType } from '~/services/recruit';

import { css } from '@emotion/react';

import { getRecruitThemeByCategory } from '~/services/recruit';
import { fontCss, inlineFlex, palettes, themeColorVars } from '~/styles/utils';

const RecruitBadge = (props: { category: RecruitCategoryType }) => {
  const { category } = props;
  return (
    <span css={[badgeCss]} data-theme={getRecruitThemeByCategory(category)}>
      {category === 'project' ? '프로젝트' : '스터디'}
    </span>
  );
};

const badgeCss = css(
  {
    color: palettes.white,
    backgroundColor: themeColorVars.mainDarkColor.var,
    width: 54,
    borderRadius: 16,
  },
  inlineFlex('center', 'center'),
  fontCss.style.B12,
  fontCss.family.auto
);

export default RecruitBadge;
