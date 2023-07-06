export const getRecruitThemeByCategory = (recruitType: 'study' | 'project') => {
  return recruitType === 'project' ? 'primary' : 'secondary';
};
