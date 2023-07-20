import type { UserInfo, UserPortfolio } from '~/services/member';

import { CertificationState, SsafyTrack } from '~/services/member';
import { SkillName } from '~/services/recruit';

const initialUserInfo: UserInfo = {
  memberId: 434,
  memberRole: 'user',
  nickname: 'mechanic',
  ssafyMember: null,
  isMajor: false,
};
const certifiedSsafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: true,
  isMajor: false,
  ssafyInfo: {
    semester: 1,
    campus: '구미',
    certificationState: CertificationState.CERTIFIED,
    majorTrack: SsafyTrack.EMBEDDED,
  },
};

const uncertifiedSsafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: true,
  isMajor: false,
  ssafyInfo: {
    semester: 1,
    campus: '구미',
    certificationState: CertificationState.UNCERTIFIED,
    majorTrack: null,
  },
};

const nonSsafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: false,
  ssafyInfo: undefined,
};

export const userInfo = {
  initialUserInfo,
  certifiedSsafyUserInfo,
  uncertifiedSsafyUserInfo,
  nonSsafyUserInfo,
};

const publicPortfolio: UserPortfolio = {
  isPublic: true,
  portfolio: {
    selfIntroduction: 'grammar',
    skills: Object.values(SkillName).slice(0, 10),
    memberLinks: [],
  },
};

const privatePortfolio: UserPortfolio = {
  isPublic: false,
  portfolio: null,
};

export const userPortfolio = {
  publicPortfolio,
  privatePortfolio,
};
