import type { RecruitParticipantsCountForServer } from './types';
import type {
  RecruitCategoryName,
  RecruitParticipantsCount,
  RecruitParts,
  SkillName,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface CreateRecruitParams {
  category: RecruitCategoryName;
  participants: RecruitParticipantsCount[];
  myPart: RecruitParts;
  endDate: string;
  title: string;
  content: string;
  skills: SkillName[];
  questionToApplicants: string;
  contact: string;
}

export interface CreateRecruitBody {
  category: RecruitCategoryName;
  limitations: RecruitParticipantsCountForServer[];
  registerRecruitType: RecruitParts;
  recruitEnd: string;
  title: string;
  content: string;
  skills: SkillName[];
  contactURI: string;
  question: string[];
}

export type CreateRecruitApiData = ApiSuccessResponse<{ recruitId: number }>;

export const createRecruit = (params: CreateRecruitParams) => {
  const {
    participants,
    myPart,
    endDate,
    contact,
    questionToApplicants,
    ...restParams
  } = params;
  const endpoint = endpoints.recruit.self();

  const limitations = participants.map(({ part, count }) => ({
    recruitType: part,
    limit: count,
  }));

  const body: CreateRecruitBody = {
    ...restParams,
    limitations,
    registerRecruitType: myPart,
    recruitEnd: endDate,
    contactURI: contact,
    question: [questionToApplicants],
  };

  return privateAxios
    .post<CreateRecruitApiData>(endpoint, body)
    .then((res) => res.data.data.recruitId);
};
