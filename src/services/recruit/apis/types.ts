import type { ScrapStatus } from '~/services/common';
import type { UserInfo } from '~/services/member';
import type { SkillInfo } from '~/services/meta/utils';
import type { RecruitParts, RecruitCategoryName } from '~/services/recruit';

export interface RecruitParticipantsCountForServer {
  recruitType: RecruitParts;
  limit: number;
}

export type RecruitParticipantsProgress = RecruitParticipantsCountForServer & {
  currentNumber: number;
};

export type RecruitDetail = {
  recruitId: number;

  category: RecruitCategoryName;
  title: string;
  content: string;
  contactURI: string;

  finishedRecruit: boolean;
  recruitStart: string;
  recruitEnd: string;
  skills: SkillInfo[];
  limits: RecruitParticipantsProgress[];
  questions: string[];
  author: UserInfo;

  view: number;
} & ScrapStatus;

export interface RecruitParticipantsDetail {
  limit: number;
  members: UserInfo[];
}
