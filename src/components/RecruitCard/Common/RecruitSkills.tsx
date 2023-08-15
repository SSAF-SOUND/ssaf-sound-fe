import type { RecruitSummary } from '~/services/recruit';

import { SkillIcon } from '~/components/Common';
import { flex } from '~/styles/utils';
import { css } from '@emotion/react';

interface RecruitCardSkillsProps extends Pick<RecruitSummary, 'skills'> {}

const RecruitCardSkills = (props: RecruitCardSkillsProps) => {
  const { skills } = props;

  return (
    <div css={selfCss}>
      {skills.map((skill) => (
        <SkillIcon {...skill} key={skill.name} size={16} />
      ))}
    </div>
  );
};

const selfCss = css(flex('', '', 'row', 5));

export default RecruitCardSkills;
