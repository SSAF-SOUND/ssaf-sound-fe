import type { RecruitCategory } from './types';

export const getRecruitThemeByCategory = (recruitType: RecruitCategory) => {
  return recruitType === 'project' ? 'primary' : 'secondary';
};
