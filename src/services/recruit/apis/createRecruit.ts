import type { RecruitParticipantsCountForServer } from './types';
import type { RecruitParticipantsCount, SkillName } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { RecruitCategoryName, RecruitParts } from '~/services/recruit';
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
  questions: string[];
}

export type CreateRecruitApiData = ApiSuccessResponse<{ recruitId: number }>;

export const createRecruit = (params: CreateRecruitParams) => {
  const endpoint = endpoints.recruit.self();
  const body: CreateRecruitBody = convertCreateRecruitParamsToBody(params);

  return privateAxios
    .post<CreateRecruitApiData>(endpoint, body)
    .then((res) => res.data.data.recruitId);
};

export const convertCreateRecruitParamsToBody = (
  params: CreateRecruitParams
) => {
  const {
    category,
    participants,
    myPart,
    endDate,
    contact,
    questionToApplicants,
    ...restParams
  } = params;

  const limitations = participants.map(({ part, count }) => ({
    recruitType: part,
    limit: count,
  }));

  const registerRecruitType =
    category === RecruitCategoryName.PROJECT ? myPart : RecruitParts.STUDY;

  const body: CreateRecruitBody = {
    ...restParams,
    category,
    limitations,
    registerRecruitType,
    recruitEnd: endDate,
    contactURI: contact,
    questions: [questionToApplicants],
  };

  return body;
};
