import type {
  RecruitCategoryName,
  RecruitParticipantsCount,
} from '~/services/recruit';

export interface RecruitFormValues {
  category: RecruitCategoryName;
  participants: {
    study: RecruitParticipantsCount[];
    project: RecruitParticipantsCount[];
  };
  myPart: string;
  endDate: string;
  title: string;
  content: string;
  skills: Partial<Record<string, boolean>>;
  questionToApplicants: string;
  contact: string;
}
