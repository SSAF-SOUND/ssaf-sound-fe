import type { RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { flex, fontCss, palettes } from '~/styles/utils';

interface AppliedRecruitCardProps {
  appliedRecruit: RecruitSummary;
}

export const AppliedRecruitCard = memo((props: AppliedRecruitCardProps) => {
  const { appliedRecruit } = props;

  return (
    <div css={selfCss}>
      <div css={headerCss}>
        <div css={appliedAtCss}>YYYY년 MM월 DD일 신청</div>
        <div>대기 중</div>
      </div>
      <RecruitCard recruitSummary={appliedRecruit} size="md" />
    </div>
  );
});

const selfCss = css({
  padding: '10px 25px',
  backgroundColor: palettes.background.grey,
});
const headerCss = css(
  { marginBottom: 10 },
  flex('center', 'space-between', 'row', 16),
  fontCss.style.B14
);

const appliedAtCss = css(fontCss.style.R14);

AppliedRecruitCard.displayName = 'AppliedRecruitCard';

export const AppliedRecruitCardSkeleton = () => {
  return (
    <div css={selfCss}>
      <div css={headerCss}>
        <Skeleton width={110} height={20} baseColor={palettes.grey3} />
        <Skeleton width={56} height={20} baseColor={palettes.grey3} />
      </div>
      <RecruitCardSkeleton size="md" />
    </div>
  );
};
