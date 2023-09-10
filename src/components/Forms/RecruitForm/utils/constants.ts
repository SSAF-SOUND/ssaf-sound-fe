// meta

import { RecruitParts } from '~/services/recruit';

export const possibleProjectParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);

export const maxParticipantsCount = 10;

export const minParticipantsCount = 1;

export const invalidSubmitMessage = '올바르지 않은 입력이 있는지 확인해주세요.';
