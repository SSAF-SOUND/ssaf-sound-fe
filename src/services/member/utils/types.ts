/**
 * 숫자가 낮을수록 높은 권한을 가집니다.
 */
export const userRoles = {
  admin: 1,
  user: 2,
};
export type UserRole = keyof typeof userRoles;

export type SsafyCampus = '서울' | '대전' | '광주' | '구미' | '부울경';
export type SsafyYear =
  | '1기'
  | '2기'
  | '3기'
  | '4기'
  | '5기'
  | '6기'
  | '7기'
  | '8기'
  | '9기'
  | '10기';

export interface UserBasicInfo {
  memberId: string;
  memberRole: UserRole;
  nickname: string;
}

export type UserSsafyInfo =
  | {
      ssafyMember?: false;
      ssafyInfo: undefined;
    }
  | {
      ssafyMember: true;
      ssafyInfo: SsafyInfo;
    };

export type UserInfo = UserBasicInfo & UserSsafyInfo;

export interface SsafyInfo {
  year: SsafyYear;
  campus: SsafyCampus;
  isMajor: boolean;
  certificationState?: CertificationState;
}

export interface CertificationState {}
