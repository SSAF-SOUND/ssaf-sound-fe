/**
 * 숫자가 낮을수록 높은 권한을 가집니다.
 */
export const userRoles = {
  admin: 1,
  user: 2,
};
export type UserRole = keyof typeof userRoles;

export interface SsafyBasicInfo {
  /** 1 ~ 10 */
  semester: number;

  /** 서울 | 대전 | 광주 | 구미 | 부울경 */
  campus: string;
}

export type SsafyInfo =
  | (SsafyBasicInfo & {
      majorType?: undefined;
      certificationState: CertificationState.UNCERTIFIED;
    })
  | (SsafyBasicInfo & {
      majorType?: MajorType;
      certificationState: CertificationState.CERTIFIED;
    });

export enum CertificationState {
  UNCERTIFIED = 'UNCERTIFIED',
  CERTIFIED = 'CERTIFIED',
}

export enum MajorType {
  PYTHON = 'python',
  EMBEDDED = 'embedded',
  JAVA = 'java',
  MOBILE = 'mobile',
}

export interface UserBasicInfo {
  memberId: number;
  memberRole: UserRole;
  nickname: string;
  isMajor: boolean;
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
