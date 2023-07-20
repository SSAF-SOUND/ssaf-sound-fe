export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participants[];
    project: Participants[];
  };
  endDate: string;
  title: string;
  content: string;
  skills: Partial<Record<string, boolean>>;
  questionToApplicants: string;
  contact: string;
}

export type Participants = {
  /** 스터디 | 프론트엔드 | 백엔드 | 앱 | 기획/디자인 */
  part: string;
  /** 1 ~ 20 */
  count: number;
};
