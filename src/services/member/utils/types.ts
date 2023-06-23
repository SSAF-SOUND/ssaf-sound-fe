/**
 * 숫자가 낮을수록 높은 권한을 가집니다.
 */
export const userRoles = {
  admin: 1,
  user: 2,
};
export type UserRole = keyof typeof userRoles;

export interface SsafyInfo {
  /**
   * 1 ~ 10
   */
  semester: number;
  /**
   * 서울 | 대전 | 광주 | 구미 | 부울경
   */
  campus: string;
  isMajor: boolean;
  certificationState: CertificationState;
}

export type CertificationState = 'UNCERTIFIED' | 'WAITING' | 'CERTIFIED';

export interface UserBasicInfo {
  memberId: number;
  memberRole: UserRole;
  nickname: string;
}

export type UserSsafyInfo =
  | {
      ssafyMember: null | false;
      ssafyInfo?: undefined;
    }
  | {
      ssafyMember: true;
      ssafyInfo: SsafyInfo;
    };

export type UserInfo = UserBasicInfo & UserSsafyInfo;
