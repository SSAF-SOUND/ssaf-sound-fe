import type { UserInfo } from '~/services/member';

import { CertificationState } from '~/services/member';

const initialUserInfo: UserInfo = {
  memberId: 434,
  memberRole: 'user',
  nickname: 'mechanic',
  ssafyMember: null,
};
const ssafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: true,
  ssafyInfo: {
    semester: 1,
    campus: '구미',
    isMajor: false,
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
