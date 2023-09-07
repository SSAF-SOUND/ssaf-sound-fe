import type {
  RecruitCategoryName,
  RecruitParticipantsCount,
  RecruitParts,
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
  skills: Partial<Record<string, boolean>>;
  questionToApplicants: string;
  contact: string;
}
