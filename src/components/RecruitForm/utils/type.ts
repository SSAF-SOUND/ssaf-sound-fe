export interface RecruitFormValues {
    category: string;
    participants: {
        study: Participant[];
        project: Participant[];
    };
}

export type Participant = {
    part: string;
    count: number;
};
