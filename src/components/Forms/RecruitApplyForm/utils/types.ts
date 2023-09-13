import type { RecruitParts } from '~/services/recruit';

export interface RecruitApplyFormValues {
  recruitPartToApply: RecruitParts;
  agreeToProvideProfile: boolean;
  answerToRecruitAuthor: string;
}
