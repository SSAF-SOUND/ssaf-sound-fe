import type {
  RecruitParticipantsDetail,
  RecruitParts,
} from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetRecruitParticipantsApiData = ApiSuccessResponse<{
  recruitTypes: Partial<Record<RecruitParts, RecruitParticipantsDetail>>;
}>;

export const getRecruitParticipants = (recruitId: number) => {
  const endpoint = endpoints.recruit.participants(recruitId);

  return privateAxios
    .get<GetRecruitParticipantsApiData>(endpoint)
    .then((res) => res.data.data.recruitTypes);
};
