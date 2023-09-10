import type { BadgeProps } from '../Common';
import type { Ref } from 'react';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import {
  getRecruitThemeByCategory,
  RecruitCategoryName,
} from '~/services/recruit';
import { fontCss, palettes, themeColorVars } from '~/styles/utils';

import { Badge, Icon } from '../Common';

interface RecruitDetailOptionToggleProps extends Omit<BadgeProps, 'theme'> {
  category?: RecruitCategoryName;
  isActive?: boolean;
}

export const RecruitDetailOptionToggle = forwardRef(
  (props: RecruitDetailOptionToggleProps, ref: Ref<HTMLButtonElement>) => {
    const {
      category = RecruitCategoryName.PROJECT,
      isActive = false,
      ...restProps
    } = props;
    return (
      <Badge
        css={[selfCss, textCss, isActive && activeCss]}
        theme={getRecruitThemeByCategory(category)}
        {...restProps}
      >
        상세 옵션
        <Icon name="triangle" css={{ transform: 'rotate(180deg)' }} size={16} />
      </Badge>
    );
  }
);

RecruitDetailOptionToggle.displayName = 'RecruitDetailOptionToggle';

const activeCss = css({
  background: themeColorVars.mainDarkColor.var,
  borderColor: themeColorVars.mainDarkColor.var,
  color: palettes.white,
});
const selfCss = css({
  width: 97,
  height: 28,
  cursor: 'pointer',
});

const textCss = css(fontCss.family.auto, fontCss.style.R12);
