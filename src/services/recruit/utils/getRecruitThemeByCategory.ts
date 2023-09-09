import { Theme } from '~/styles/utils';
import { isEqualString } from '~/utils';

import { RecruitCategoryName } from './types';

export const getRecruitThemeByCategory = (
  category: RecruitCategoryName
): Extract<Theme, Theme.PRIMARY | Theme.SECONDARY> => {
  if (
    isEqualString(category, RecruitCategoryName.PROJECT, {
      caseSensitive: false,
    })
  )
    return Theme.PRIMARY;

  if (
    isEqualString(category, RecruitCategoryName.STUDY, { caseSensitive: false })
  )
    return Theme.SECONDARY;

  throw new Error(
    `잘못된 카테고리가 전달되었습니다. \n> category: ${category}`
  );
};
