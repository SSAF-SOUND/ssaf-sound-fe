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
      certificationState: CertificationState.UNCERTIFIED;
      majorTrack?: null | undefined;
    })
  | (SsafyBasicInfo & {
      certificationState: CertificationState.CERTIFIED;
      majorTrack: SsafyTrack;
    });

export enum CertificationState {
  UNCERTIFIED = 'UNCERTIFIED',
  CERTIFIED = 'CERTIFIED',
}

export enum SsafyTrack {
  PYTHON = 'Python',
  EMBEDDED = 'Embedded',
  JAVA = 'Java',
  MOBILE = 'Mobile',
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
      ssafyInfo?: undefined | null;
    }
  | {
      ssafyMember: true;
      ssafyInfo: SsafyInfo;
    };

export type UserInfo = UserBasicInfo & UserSsafyInfo;

// 프로필

export interface ProfileVisibility {
  isPublic: boolean;
}

// 프로필 - 포트폴리오

export interface PortfolioExternalLink {
  linkName: string;
  path: string;
}

export interface UserPortfolio {
  selfIntroduction: string;
  skills: string[];
  memberLinks: PortfolioExternalLink[];
}
