import type { UserInfo, UserPortfolio } from '~/services/member';

import { faker } from '@faker-js/faker';

import { mockHtmlString } from '~/mocks/handlers/common';
import { CertificationState, SsafyTrack } from '~/services/member';
import { deletedUserNicknamePrefix } from '~/services/member/utils/isDeletedUser';
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

const deletedUserInfo: UserInfo = {
  ...certifiedSsafyUserInfo,
  nickname: deletedUserNicknamePrefix,
};

export const userInfo = {
  initialUserInfo,
  certifiedSsafyUserInfo,
  uncertifiedSsafyUserInfo,
  nonSsafyUserInfo,
  deletedUserInfo,
};

export const mockEmptyPortfolio: UserPortfolio = {
  selfIntroduction: '',
  skills: [],
  memberLinks: [],
};

export const mockPortfolio: UserPortfolio = {
  selfIntroduction: mockHtmlString,
  skills: Object.values(SkillName).slice(0, 10),
  memberLinks: Array(10)
    .fill(undefined)
    .map(() => ({
      linkName: faker.lorem.words(1),
      path: `https://www.naver.com`,
    })),
};

export const createMockUser = (id: number, certified?: boolean): UserInfo => {
  const isMajor = Boolean(id % 2);
  const tracks = Object.values(SsafyTrack);
  const campuses = ['서울', '구미', '광주', '부울경', '대전'];

  const ssafyInfo = certified
    ? ({
        certificationState: CertificationState.CERTIFIED,
        majorTrack:
          tracks[faker.number.int({ min: 0, max: tracks.length - 1 })],
      } as const)
    : ({
        certificationState: CertificationState.UNCERTIFIED,
        majorTrack: null,
      } as const);

  return {
    isMajor,
    memberId: id,
    nickname: faker.word.words(3).slice(0, 11),
    memberRole: 'user',
    ssafyMember: true,
    ssafyInfo: {
      campus: campuses[faker.number.int({ min: 0, max: campuses.length - 1 })],
      semester: faker.number.int({ min: 1, max: 9 }),
      ...ssafyInfo,
    },
  };
};

export const mockUserInfo = {
  initialUserInfo,
  nonSsafyUserInfo,
  uncertifiedSsafyUserInfo,
  certifiedSsafyUserInfo,
  deletedUserInfo,
};
