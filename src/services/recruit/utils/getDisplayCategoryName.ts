import { RecruitCategoryName } from '~/services/recruit';

export const getDisplayCategoryName = (category: RecruitCategoryName) => {
  if (category === RecruitCategoryName.PROJECT) return '프로젝트';
  if (category === RecruitCategoryName.STUDY) return '스터디';

  throw new Error(
    `잘못된 카테고리가 전달되었습니다. \n> category: ${category}`
  );
};
