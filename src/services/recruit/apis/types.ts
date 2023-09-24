import type { ScrapStatus, InfiniteParams } from '~/services/common';
import type { UserInfo } from '~/services/member';
import type { SkillInfo } from '~/services/meta/utils';
import type {
  RecruitParts,
  RecruitCategoryName,
  MatchStatus,
  SkillName,
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

export type RecruitParticipantUserInfo = UserInfo & {
  recruitApplicationId: number;
  joinedAt: string;
};
export interface RecruitParticipantsDetail {
  limit: number;
  members: RecruitParticipantUserInfo[];
}
export interface RecruitParticipantsSummary {
  limit: number;
  members: Pick<UserInfo, 'nickname' | 'isMajor'>[];
}

export interface RecruitParticipantsDetailWithPart
  extends RecruitParticipantsDetail {
  recruitType: RecruitParts;
}

export interface RecruitParticipantsSummaryWithPart
  extends RecruitParticipantsSummary {
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
  participants: RecruitParticipantsSummaryWithPart[];
}

export interface AppliedRecruitSummary extends RecruitSummary {
  appliedAt: string;
  matchStatus: MatchStatus;
}

export interface RecruitSummariesQueryStringObject extends InfiniteParams {
  keyword: string;
  category: RecruitCategoryName;
  completed: boolean;
  recruitParts: RecruitParts[];
  skills: SkillName[];
}

export type RecruitSummariesQueryStringObjectWithoutInfiniteParams = Omit<
  RecruitSummariesQueryStringObject,
  keyof InfiniteParams
>;

export interface RecruitCursorData {
  nextCursor: number | null;
  isLast: boolean;
}

export interface RecruitApplicationDetail {
  category: RecruitCategoryName;

  //

  recruitId: number;
  recruitApplicationId: number;

  recruitType: RecruitParts;
  reply: string;
  question: string;
  liked: boolean;

  author: UserInfo;
  matchStatus: MatchStatus;

  appliedAt: string;
}

export type MyRecruitApplicationDetail = Omit<
  RecruitApplicationDetail,
  'liked' | 'author'
>;

export interface UpdatedRecruitApplicationInfo {
  recruitApplicationId: number;
  matchStatus: MatchStatus;
}

export interface RecruitApplicant {
  recruitApplicationId: number;
  matchStatus: MatchStatus;
  author: UserInfo;
  reply: string;
  question: string;
  liked: boolean;

  appliedAt: string;
}
