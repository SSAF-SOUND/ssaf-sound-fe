import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import SkillBadge from '~/components/SkillBadge';
import { SkillName } from '~/services/recruit';

const fieldName = 'skills';

export const Skills = () => {
  const {
    setValue,
    register,
    formState: { defaultValues: { skills: defaultSkills } = {} },
  } = useRecruitFormContext();

  register(fieldName);

  return (
    <ul>
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
  );
};
