// meta

import { RecruitParts } from '~/services/recruit';

export const possibleProjectParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);

export const maxParticipantsCount = 20;

export const minParticipantsCount = 1;
