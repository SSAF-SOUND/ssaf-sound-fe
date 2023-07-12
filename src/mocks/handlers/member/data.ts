import type { UserInfo } from '~/services/member';

import { CertificationState } from '~/services/member';

const initialUserInfo: UserInfo = {
  memberId: 434,
  memberRole: 'user',
  nickname: 'mechanic',
  ssafyMember: null,
  isMajor: false,
};
const ssafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: true,
  isMajor: false,
  ssafyInfo: {
    semester: 1,
    campus: '구미',
    majorTrack: undefined,
    certificationState: CertificationState.UNCERTIFIED,
  },
};

const nonSsafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: false,
  ssafyInfo: undefined,
};

export const userInfo = {
  initialUserInfo,
  ssafyUserInfo,
  nonSsafyUserInfo,
};
