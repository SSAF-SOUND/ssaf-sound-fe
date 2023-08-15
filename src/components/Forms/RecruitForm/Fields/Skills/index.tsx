import { css } from '@emotion/react';

import SelectedSkills from '~/components/Forms/RecruitForm/Common/SelectedSkills';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import SkillBadge from '~/components/SkillBadge';
import { SkillName } from '~/services/recruit';
import { flex } from '~/styles/utils';

const fieldName = 'skills';

export const Skills = () => {
  const {
    setValue,
    register,
    formState: { defaultValues: { skills: defaultSkills } = {} },
  } = useRecruitFormContext();

  register(fieldName);

  return (
    <>
      <SelectedSkills css={{ marginBottom: 30 }} />

      <ul css={skillBadgeContainerCss}>
        {Object.values(SkillName).map((name) => {
          return (
            <SkillBadge
              key={name}
              name={name}
              defaultPressed={defaultSkills?.[name]}
              onPressedChange={(pressed) => {
                setValue(`${fieldName}.${name}`, pressed);
              }}
            />
          );
        })}
      </ul>
    </>
  );
};

const skillBadgeContainerCss = css(
  flex('center', 'flex-start', 'row', 6, 'wrap')
);
