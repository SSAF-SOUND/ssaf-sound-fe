import type { UserInfo } from '~/services/member';

import { CertificationState, SsafyTrack } from '~/services/member';

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
