import type { RecruitSummary } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';

import { SmallRecruitCard } from '~/components/RecruitCard';
import { routes } from '~/utils';

export interface RecruitsPreviewRecruitItemProps {
  recruit: RecruitSummary;
}

export const RecruitsPreviewRecruitItem = (
  props: RecruitsPreviewRecruitItemProps
) => {
  const { recruit } = props;
  return (
    <Link href={routes.recruit.detail(recruit.recruitId)} css={selfCss}>
      <SmallRecruitCard
        css={{ wordBreak: 'break-all' }}
        recruitSummary={recruit}
      />
    </Link>
  );
};

const selfCss = css({
  transition: 'transform 200ms',
  '&:hover, &:focus-visible': {
    transform: 'translate3d(0, 3px, 0)',
  },
  '&:active': {
    transform: 'translate3d(0, 0, 0)',
  },
});
