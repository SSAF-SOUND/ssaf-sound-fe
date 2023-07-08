export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participant[];
    project: Participant[];
  };
}

type Participant = {
  part: string;
  count: number;
};
