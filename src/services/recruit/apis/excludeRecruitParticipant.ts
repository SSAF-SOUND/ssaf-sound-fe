import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface ExcludeRecruitParticipantParams {
  recruitId: number;
  recruitApplicationId: number;
}

/**
 * @deprecated
 * - `rejectRecruitApplication`을 대신 사용
 */
export const excludeRecruitParticipant = (
  params: ExcludeRecruitParticipantParams
) => {
  const endpoint = endpoints.recruit.participant(params);

  return privateAxios.delete(endpoint).then((res) => res.data);
};
