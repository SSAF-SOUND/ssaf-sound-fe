import type { ScrapStatus } from '~/services/common';
import type { UserInfo } from '~/services/member';
import type { SkillInfo } from '~/services/meta/utils';
import type {
  RecruitParts,
  RecruitCategoryName,
  MatchStatus,
} from '~/services/recruit';

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

  mine: boolean;
  matchStatus?: MatchStatus;
} & ScrapStatus;

export interface RecruitParticipantsDetail {
  limit: number;
  members: UserInfo[];
}

export interface RecruitParticipantsDetailWithPart
  extends RecruitParticipantsDetail {
  recruitType: RecruitParts;
}

export interface RecruitSummary {
  category: RecruitCategoryName;
  mine: boolean;

  //

  recruitId: number;
  title: string;
  content: string;

  finishedRecruit: boolean;
  recruitEnd: string;

  skills: SkillInfo[];
  participants: RecruitParticipantsDetailWithPart[];
}
