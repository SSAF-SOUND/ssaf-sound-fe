import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils/type';
import type { SkillName } from '~/services/recruit';

/**
 * { React: true, Vue: true } -> ['React', 'Vue']
 */
export const convertSkillsObjectToArray = (
  skills: RecruitFormValues['skills']
) => {
  return Object.entries(skills)
    .filter(([, value]) => !!value)
    .map(([key]) => key) as SkillName[];
};
