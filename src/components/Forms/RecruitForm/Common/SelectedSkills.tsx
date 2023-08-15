import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';
import type { SkillName } from '~/services/recruit';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { SkillIcon } from '~/components/Common';
import FieldOverview from '~/components/Forms/RecruitForm/Common/FieldOverview';
import { flex } from '~/styles/utils';

const fieldName = 'skills';

interface SelectedSkillsProps {
  className?: string;
}

const SelectedSkills = (props: SelectedSkillsProps) => {
  const { className } = props;
  const skills = useWatch<RecruitFormValues>({
    name: fieldName,
  }) as Record<string, boolean>;

  const selectedSkillNames = Object.entries(skills)
    .filter(([, selected]) => selected)
    .map(([skillName]) => skillName);

  return (
    <div className={className}>
      <FieldOverview>선택한 스킬</FieldOverview>
      <ul css={skillListCss}>
        {selectedSkillNames.map((selectedSkillName) => (
          <SkillIcon
            key={selectedSkillName}
            name={selectedSkillName as SkillName}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectedSkills;

const skillListCss = css(flex('center', 'flex-start', 'row', 6, 'wrap'), {
  minHeight: 24,
});
