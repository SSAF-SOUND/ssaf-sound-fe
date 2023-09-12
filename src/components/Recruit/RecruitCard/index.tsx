import type { RecruitSummary } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';
import { memo } from 'react';

import { SkillIcon } from '~/components/Common';
import { RecruitBadge } from '~/components/Recruit/RecruitBadge';
import { recruitCardPaddingX } from '~/components/Recruit/RecruitCard/constants';
import { RecruitCardParticipants } from '~/components/Recruit/RecruitCard/RecruitCardParticipants';
import { RecruitDeadline } from '~/components/Recruit/RecruitDeadline';
import { getRecruitThemeByCategory } from '~/services/recruit';
import {
  colorMix,
  flex,
  fontCss,
  lineClamp,
  palettes,
  themeColorVars,
} from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitCardProps {
  recruitSummary: RecruitSummary;
  withBadge?: boolean;
}

export const RecruitCard = memo((props: RecruitCardProps) => {
  const { withBadge = false, recruitSummary } = props;
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

  return (
    <div
      css={[selfCss, finishedRecruit && completedRecruitCss]}
      data-theme={recruitTheme}
    >
      <Link href={routes.recruit.detail(recruitId)}>
        <header css={[headerCss, { marginBottom: 6 }]}>
          <div css={headerLeftCss}>
            {!showMyRecruitBadge && <RecruitBadge.MyRecruit />}
            <h3 css={titleCss}>{title}</h3>
          </div>

          <RecruitDeadline
            css={deadlineCss}
            endDate={recruitEnd}
            theme={recruitTheme}
            size="sm"
          />
        </header>
        <div css={skillsCss}>
          {skills.slice(0, 10).map(({ name: skillName }) => (
            <SkillIcon
              key={skillName}
              name={skillName}
              size={skillIconSize}
              invert
            />
          ))}
        </div>
      </Link>

      <RecruitCardParticipants
        css={{ marginTop: 12 }}
        recruitSummary={recruitSummary}
      />
    </div>
  );
});

RecruitCard.displayName = 'RecruitCard';

const selfCss = css({
  minWidth: 300,
  width: '100%',
  overflow: 'hidden',
  padding: `12px ${recruitCardPaddingX}px`,
  backgroundColor: palettes.white,
  color: palettes.font.grey,
  borderRadius: 30,
});

const completedRecruitCss = css({
  backgroundColor: colorMix(
    '30%',
    themeColorVars.mainDarkColor.var,
    palettes.white
  ),
});

const headerCss = css(flex('center', 'space-between', 'row', 6));

const headerLeftCss = css(flex('flex-start', 'flex-start', 'row', 6));

const titleCss = css(
  { color: palettes.font.grey, wordBreak: 'break-all' },
  lineClamp(1),
  fontCss.style.B14
);

const deadlineCss = css({ minWidth: 60 });

const skillIconSize = 16;
const skillsCss = css(
  {
    height: skillIconSize,
  },
  lineClamp(1),
  flex('flex-start', 'flex-start', 'row', 4, 'wrap')
);
