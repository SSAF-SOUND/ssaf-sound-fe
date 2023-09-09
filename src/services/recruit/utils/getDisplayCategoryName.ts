import { RecruitCategoryName } from '~/services/recruit';
import { isEqualString } from '~/utils';

export const getDisplayCategoryName = (category: RecruitCategoryName) => {
  if (
    isEqualString(category, RecruitCategoryName.PROJECT, {
      caseSensitive: false,
    })
  )
    return '프로젝트';

  if (
    isEqualString(category, RecruitCategoryName.STUDY, {
      caseSensitive: false,
    })
  )
    return '스터디';

  throw new Error(
    `잘못된 카테고리가 전달되었습니다. \n> category: ${category}`
  );
};
