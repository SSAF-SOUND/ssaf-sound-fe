import type { ToggleProps } from '@radix-ui/react-toggle';
import type { SkillType } from '~/services/recruit';

import { css } from '@emotion/react';
import * as Toggle from '@radix-ui/react-toggle';

import { fontCss, inlineFlex, palettes } from '~/styles/utils';

import { SkillIcon } from '../Common';

interface SkillBadgeProps extends ToggleProps {
  name: SkillType;
}

const SkillBadge = (props: SkillBadgeProps) => {
  const { name = 'React' } = props;
  return (
    <Toggle.Root css={[selfCss]}>
      <SkillIcon name={name} size={SKILL_BADGE_ICON_SIZE} />
      <span css={textCss}>{name}</span>
    </Toggle.Root>
  );
};

const selfCss = css(inlineFlex('center', 'center', 'row', 8), {
  padding: '4px 8px',
  borderRadius: 16,
  cursor: 'pointer',
  border: `1px solid ${palettes.white}`,
  color: palettes.white,
  transition: 'color 200ms, background-color 200ms, border-color 200ms',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: palettes.primary.dark,
    color: palettes.primary.dark,
  },
  '&[data-state="on"]': {
    background: palettes.primary.darkest,
    borderColor: palettes.primary.darkest,
    color: palettes.white,
  },
});

const textCss = css(fontCss.style.R14, fontCss.family.auto);

const SKILL_BADGE_ICON_SIZE = 21;

export default SkillBadge;
