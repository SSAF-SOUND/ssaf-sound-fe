import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface ExcludeRecruitParticipantParams {
  recruitId: number;
  userId: number;
}

export const excludeRecruitParticipant = (
  params: ExcludeRecruitParticipantParams
) => {
  const endpoint = endpoints.recruit.participant(params);

  return privateAxios.delete(endpoint).then((res) => res.data);
};
