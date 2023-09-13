import { RecruitCategoryName } from '~/services/recruit';

export const recruitApplyFormFieldOrder = {
  recruitPartToApply: {
    [RecruitCategoryName.PROJECT]: 1,
  },
  agreeToProvideProfile: {
    [RecruitCategoryName.PROJECT]: 2,
    [RecruitCategoryName.STUDY]: 1,
  },
  answerToRecruitAuthor: {
    [RecruitCategoryName.PROJECT]: 3,
    [RecruitCategoryName.STUDY]: 2,
  },
};
