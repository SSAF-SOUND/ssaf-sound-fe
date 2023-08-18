import type { BadgeProps } from '../Common';
import type { SkillType } from '~/services/recruit';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

import { SkillIcon, Badge } from '../Common';

interface SkillBadgeProps extends Omit<BadgeProps, 'asChild'> {
  name?: SkillType;
}

const SkillBadge = (props: Omit<SkillBadgeProps, 'asChild'>) => {
  const { name = 'React', ...restProps } = props;
  const displayName = nameMapper[name] ?? name;

  return (
    <Badge {...restProps}>
      <SkillIcon name={name} size={SKILL_BADGE_ICON_SIZE} />
      <span css={textCss}>{displayName}</span>
    </Badge>
  );
};

const nameMapper: Partial<Record<SkillType, string>> = {
  IOS: 'iOS',
  NextJs: 'Nextjs',
  NodeJs: 'Nodejs',
};

const textCss = css(fontCss.style.R14, fontCss.family.auto);

const SKILL_BADGE_ICON_SIZE = 21;

export default SkillBadge;
