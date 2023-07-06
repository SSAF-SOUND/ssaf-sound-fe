import type { SkillIconProps } from '../Common/SkillIcon';

import { css } from '@emotion/react';

import { fontCss, inlineFlex, palettes } from '~/styles/utils';

import { SkillIcon } from '../Common';

interface SkillBadgeProps extends Omit<SkillIconProps, 'size'> {
  isActive?: boolean;
}

const SkillBadge = (props: SkillBadgeProps) => {
  const { isActive = false, name = 'React' } = props;
  return (
    <span css={[selfCss, isActive && activeCss]}>
      <SkillIcon name={name} size={SKILL_BADGE_ICON_SIZE} />
      <span css={textCss}>
        {name.replace(/^[a-z]/, (char) => char.toUpperCase())}
      </span>
    </span>
  );
};

const selfCss = css(inlineFlex('center', 'center', 'row', 8), {
  padding: '4px 8px',
  borderRadius: 12,
  cursor: 'pointer',
  border: `1px solid ${palettes.white}`,
  '&:hover': {
    borderColor: palettes.primary.dark,
    color: palettes.primary.dark,
  },
});

const textCss = css(fontCss.style.R14);

const activeCss = css({
  background: palettes.primary.darkest,
  borderColor: palettes.primary.darkest,
});

const SKILL_BADGE_ICON_SIZE = 21;

export default SkillBadge;
