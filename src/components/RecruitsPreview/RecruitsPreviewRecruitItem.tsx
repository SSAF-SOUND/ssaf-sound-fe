import type { RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';

import { RecruitCard } from '~/components/Recruit/RecruitCard';

export interface RecruitsPreviewRecruitItemProps {
  recruit: RecruitSummary;
}

export const RecruitsPreviewRecruitItem = (
  props: RecruitsPreviewRecruitItemProps
) => {
  const { recruit } = props;
  return (
    <RecruitCard
      size="sm"
      withBadge={true}
      css={selfCss}
      recruitSummary={recruit}
    />
  );
};

const selfCss = css({
  flexShrink: 0,
  transition: 'transform 200ms',
  '&:hover, &:focus-visible': {
    transform: 'translate3d(0, 3px, 0)',
  },
  '&:active': {
    transform: 'translate3d(0, 0, 0)',
  },
});
