import { Theme } from '~/styles/utils';

import { RecruitCategoryName } from './types';

export const getRecruitThemeByCategory = (
  category: RecruitCategoryName
): Extract<Theme, Theme.PRIMARY | Theme.SECONDARY> => {
  if (category === RecruitCategoryName.PROJECT) return Theme.PRIMARY;
  if (category === RecruitCategoryName.STUDY) return Theme.SECONDARY;

  throw new Error(
    `잘못된 카테고리가 전달되었습니다. \n> category: ${category}`
  );
};
