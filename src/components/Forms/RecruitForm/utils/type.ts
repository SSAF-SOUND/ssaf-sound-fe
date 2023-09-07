import type {
  RecruitCategoryName,
  RecruitParticipantsCount,
  RecruitParts,
  SkillName,
} from '~/services/recruit';

export interface RecruitFormValues {
  category: RecruitCategoryName;
  participants: {
    study: RecruitParticipantsCount[];
    project: RecruitParticipantsCount[];
  };
  myPart: RecruitParts;
  endDate: string;
  title: string;
  content: string;
  skills: Partial<Record<SkillName, boolean>>;
  questionToApplicants: string;
  contact: string;
}
