import type { BadgeProps } from '../Common';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

import { Badge, Icon } from '../Common';

interface RecruitDetailOptionToggleProps extends BadgeProps {}

export const RecruitDetailOptionToggle = (
  props: RecruitDetailOptionToggleProps
) => {
  return (
    <Badge css={[selfCss, textCss]} {...props}>
      상세 옵션
      <Icon name="triangle" css={{ transform: 'rotate(180deg)' }} size={16} />
    </Badge>
  );
};

const selfCss = css({
  '&[data-hasQueries="true"]': {
    background: palettes.primary.default,
  },
  width: 97,
  height: 28,
  cursor: 'pointer',
});

const textCss = css(fontCss.family.auto, fontCss.style.R12);
