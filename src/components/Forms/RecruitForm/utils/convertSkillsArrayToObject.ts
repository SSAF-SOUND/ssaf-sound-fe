import type { SkillName } from '~/services/recruit';

/**
 * ['React', 'Vue'] -> { React: true, Vue: true }
 */
export const convertSkillsArrayToObject = (
  skills: SkillName[]
): Partial<Record<SkillName, boolean>> => {
  return Object.fromEntries(skills.map((skill) => [skill, true]));
};
