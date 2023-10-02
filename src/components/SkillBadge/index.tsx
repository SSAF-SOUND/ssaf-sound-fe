import type { BadgeProps } from '~/components/Common/Badge';
import type { SkillName } from '~/services/recruit';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { Badge } from '~/components/Common/Badge';
import { SkillIcon } from '~/components/Common/SkillIcon';
import { fontCss } from '~/styles/utils';


interface SkillBadgeProps extends Omit<BadgeProps, 'asChild'> {
  name: SkillName;
  theme?: 'primary' | 'secondary';
}

const SkillBadge = forwardRef<HTMLButtonElement, SkillBadgeProps>(
  (props, ref) => {
    const { name, theme = 'primary', ...restProps } = props;
    const displayName = nameMapper[name] ?? name;

    return (
      <Badge ref={ref} theme={theme} {...restProps}>
        <SkillIcon name={name} size={SKILL_BADGE_ICON_SIZE} />
        <span css={textCss}>{displayName}</span>
      </Badge>
    );
  }
);
SkillBadge.displayName = 'SkillBadge';

const nameMapper: Partial<Record<SkillName, string>> = {
  IOS: 'iOS',
};

const textCss = css(fontCss.style.R14, fontCss.family.auto);

const SKILL_BADGE_ICON_SIZE = 21;

export default SkillBadge;
