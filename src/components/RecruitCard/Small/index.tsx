import type { RecruitCategoryType, RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';

import Dday from '~/components/Dday';
import { flex, fontCss, lineClamp, palettes } from '~/styles/utils';

import RecruitBadge from './RecruitBadge';
import RecruitCardSkills from '../Common/RecruitSkills';

export interface RecruitCardProps extends RecruitSummary {
  category?: RecruitCategoryType;
}

const MAX_SKILL_SVG_NUM = 6;

const SmallRecruitCard = (props: RecruitCardProps) => {
  const { category = 'project', recruitEnd, title, skills } = props;
  return (
    <div css={selfCss}>
      <div css={flex('center', 'space-between', 'row')}>
        <RecruitBadge category={category} />
        <Dday recruitEnd={recruitEnd} size="sm" category={category} />
      </div>

      <div>
        <h2 css={titleCss}>{title}</h2>
        <RecruitCardSkills skills={skills.slice(0, MAX_SKILL_SVG_NUM)} />
      </div>
    </div>
  );
};

export default SmallRecruitCard;

const selfCss = css([
  {
    width: 140,
    height: 140,
    background: palettes.white,
    borderRadius: 16,
    padding: '10px 10px',
  },
  flex('', '', 'column', 20),
]);

const titleCss = css([
  fontCss.style.B16,
  lineClamp(2),
  {
    color: palettes.black,
    lineHeight: '22px',
    wordBreak: 'keep-all',
  },
]);
