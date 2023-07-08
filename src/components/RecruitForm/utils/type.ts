export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participants[];
    project: Participants[];
  };
  endDate: string;
  title: string;
  content: string;
  skills: Record<string, boolean>;
  questionToApplicants: string;
  contact: string;
}

export type Participants = {
  part: string;
  count: number;
};
