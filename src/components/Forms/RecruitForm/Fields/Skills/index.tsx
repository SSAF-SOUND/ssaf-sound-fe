import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import SelectedSkills from '~/components/Forms/RecruitForm/Common/SelectedSkills';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import SkillBadge from '~/components/SkillBadge';
import { SkillName } from '~/services/recruit';
import { flex } from '~/styles/utils';

const fieldName = 'skills';

export const Skills = () => {
  const { register } = useRecruitFormContext();

  register(fieldName);

  return (
    <>
      <SelectedSkills css={{ marginBottom: 30 }} />

      <ul css={skillBadgeContainerCss}>
        {Object.values(SkillName).map((name) => {
          return <Skill key={name} name={name} />;
        })}
      </ul>
    </>
  );
};

const skillBadgeContainerCss = css(
  flex('center', 'flex-start', 'row', 6, 'wrap')
);

interface SkillProps {
  name: SkillName;
}
const Skill = (props: SkillProps) => {
  const { name } = props;
  const { setValue } = useRecruitFormContext();
  const pressed = useWatch<RecruitFormValues>({
    name: `${fieldName}.${name}`,
  }) as boolean;

  return (
    <SkillBadge
      key={name}
      name={name}
      pressed={pressed}
      onPressedChange={(pressed) => {
        setValue(`${fieldName}.${name}`, pressed);
      }}
    />
  );
};
