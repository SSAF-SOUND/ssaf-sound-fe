import type { RecruitSummary } from '~/services/recruit';

import { SkillIcon } from '~/components/Common';
import { flex } from '~/styles/utils';

interface RecruitCardSkillsProps extends Pick<RecruitSummary, 'skills'> {}

const RecruitCardSkills = (props: RecruitCardSkillsProps) => {
  const { skills } = props;

  return (
    <div css={flex('', '', 'row', 3)}>
      {skills.map((skill) => (
        <SkillIcon {...skill} key={skill.name} size={16} />
      ))}
    </div>
  );
};

export default RecruitCardSkills;
