import type { SkillName } from '~/services/recruit';

import { css } from '@emotion/react';

import { SkillIcon } from '~/components/Common/SkillIcon';
import { flex } from '~/styles/utils';

interface RecruitSkillInfoProps {
  skills: SkillName[];
}

export const RecruitSkillInfo = (props: RecruitSkillInfoProps) => {
  const { skills } = props;
  return (
    <div css={selfCss}>
      {skills.map((skill) => (
        <SkillIcon key={skill} name={skill} />
      ))}
    </div>
  );
};

const selfCss = css(flex('center', 'flex-start', 'row', 4, 'wrap'));
