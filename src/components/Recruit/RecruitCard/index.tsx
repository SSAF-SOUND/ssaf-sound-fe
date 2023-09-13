import type { SerializedStyles } from '@emotion/react';
import type { RecruitSummary } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';
import { memo } from 'react';

import { SkillIcon } from '~/components/Common';
import { RecruitBadge } from '~/components/Recruit/RecruitBadge';
import {
  middleRecruitCardPaddingX,
  smallRecruitCardPadding,
} from '~/components/Recruit/RecruitCard/constants';
import { RecruitCardParticipants } from '~/components/Recruit/RecruitCard/RecruitCardParticipants';
import { RecruitCardTitle } from '~/components/Recruit/RecruitCard/RecruitCardTitle';
import { RecruitDeadline } from '~/components/Recruit/RecruitDeadline';
import { getRecruitThemeByCategory } from '~/services/recruit';
import {
  colorMix,
  flex,
  inlineFlex,
  lineClamp,
  palettes,
  themeColorVars,
} from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitCardProps {
  className?: string;
  recruitSummary: RecruitSummary;
  withBadge?: boolean;
  size?: 'sm' | 'md';
}

type RecruitCardSize = 'sm' | 'md';

const isSmallSize = (size: RecruitCardSize) => {
  return size === 'sm';
};

export const RecruitCard = memo((props: RecruitCardProps) => {
  const { className, withBadge = false, size = 'sm', recruitSummary } = props;

  const isSmallCard = isSmallSize(size);

  const {
    title,
    skills,
    category,
    mine,
    recruitId,
    recruitEnd,
    finishedRecruit,
  } = recruitSummary;

  const showMyRecruitBadge = withBadge && mine;

  const recruitTheme = getRecruitThemeByCategory(category);
  const showSkillCount = isSmallCard ? 5 : 10;

  return (
    <div
      css={[selfCss, sizeCss[size], finishedRecruit && completedRecruitCss]}
      data-theme={recruitTheme}
      className={className}
    >
      <Link css={linkCss} href={routes.recruit.detail(recruitId)}>
        <header css={[headerCss, { marginBottom: 6 }]}>
          {!isSmallCard && (
            <div css={headerLeftCss}>
              {showMyRecruitBadge && <RecruitBadge.MyRecruit />}
              <RecruitCardTitle>{title}</RecruitCardTitle>
            </div>
          )}

          {withBadge && isSmallCard && (
            <RecruitBadge.RecruitCategory category={category} />
          )}

          <RecruitDeadline
            css={deadlineCss}
            endDate={recruitEnd}
            theme={recruitTheme}
            completed={finishedRecruit}
            size="sm"
          />
        </header>

        {isSmallCard && (
          <div css={{ margin: '14px 0 10px' }}>
            <RecruitCardTitle showLineCount={2}>{title}</RecruitCardTitle>
          </div>
        )}

        <div css={skillsCss}>
          {skills.slice(0, showSkillCount).map(({ name: skillName }) => (
            <SkillIcon
              key={skillName}
              name={skillName}
              size={skillIconSize}
              invert
            />
          ))}
        </div>
      </Link>

      {!isSmallCard && (
        <RecruitCardParticipants
          css={{ marginTop: 12 }}
          recruitSummary={recruitSummary}
        />
      )}
    </div>
  );
});

RecruitCard.displayName = 'RecruitCard';

const selfCss = css({
  overflow: 'hidden',
  backgroundColor: palettes.white,
  color: palettes.font.grey,
});

const linkCss = css({
  display: 'block',
  transition: 'transform 200ms',
  '&:hover, &:focus-visible': {
    transform: 'translate3d(2px, 0, 0)',
  },
  '&:active': {
    transform: 'translate3d(0, 0, 0)',
  },
});

const sizeCss: Record<RecruitCardSize, SerializedStyles> = {
  sm: css({
    width: 140,
    height: 140,
    padding: smallRecruitCardPadding,
    borderRadius: 20,
  }),
  md: css({
    minWidth: 300,
    width: '100%',
    padding: `12px ${middleRecruitCardPaddingX}px`,
    borderRadius: 30,
  }),
};

const completedRecruitCss = css({
  backgroundColor: colorMix(
    '30%',
    themeColorVars.mainDarkColor.var,
    palettes.white
  ),
});

const headerCss = css(flex('center', 'space-between', 'row', 6));

const headerLeftCss = css(flex('flex-start', 'flex-start', 'row', 6));

const deadlineCss = css({ minWidth: 64 }, inlineFlex('', 'flex-end', 'row'));

const skillIconSize = 16;
const skillsCss = css(
  {
    height: skillIconSize,
  },
  lineClamp(1),
  flex('flex-start', 'flex-start', 'row', 4, 'wrap')
);
