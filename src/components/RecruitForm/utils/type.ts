export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participants[];
    project: Participants[];
  };
  endDate: string;
}

export type Participants = {
  part: string;
  count: number;
};
