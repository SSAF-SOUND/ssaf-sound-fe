export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participants[];
    project: Participants[];
  };
}

export type Participants = {
  part: string;
  count: number;
};

export type a = {
  s: string;
}
