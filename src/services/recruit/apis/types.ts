import type { RecruitParts } from '~/services/recruit';

export interface RecruitParticipantsCountForServer {
  recruitType: RecruitParts;
  limit: number;
}
