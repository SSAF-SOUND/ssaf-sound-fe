import type { Portfolio, UserInfo } from '~/services/member';

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

export const portfolio: Portfolio = {
  selfIntroduction:
    '<ul><li>안녕하세요</li><li>안녕하세요</li><li>안녕하세요</li><li>안녕하세요</li></ul>',
  skills: Object.values(SkillName).slice(0, 10),
  memberLinks: Array(10)
    .fill(undefined)
    .map((_, index) => ({
      linkName: `링크${index}`,
      path: `https://www.naver.com`,
    })),
};
