import type { UserPortfolio, UserInfo } from '~/services/member';

import { faker } from '@faker-js/faker';

import { mockHtmlString } from '~/mocks/handlers/common';
import { CertificationState, SsafyTrack } from '~/services/member';
import { SkillName } from '~/services/recruit';

const initialUserInfo: UserInfo = {
  memberId: 144,
  memberRole: 'user',
  nickname: 'mechanic',
  ssafyMember: null,
  isMajor: false,
};
const certifiedSsafyUserInfo: UserInfo = {
  ...initialUserInfo,
  memberId: 586,
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
  memberId: 248,
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
  memberId: 738,
  ssafyMember: false,
  ssafyInfo: undefined,
};

export const userInfo = {
  initialUserInfo,
  certifiedSsafyUserInfo,
  uncertifiedSsafyUserInfo,
  nonSsafyUserInfo,
};

export const portfolio: UserPortfolio = {
  selfIntroduction: mockHtmlString,
  skills: Object.values(SkillName).slice(0, 10),
  memberLinks: Array(10)
    .fill(undefined)
    .map(() => ({
      linkName: faker.lorem.words(1),
      path: `https://www.naver.com`,
    })),
};
