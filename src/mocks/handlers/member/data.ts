import type { UserInfo } from '~/services/member';

const initialUserInfo: UserInfo = {
  memberId: 'ae962aa1-b463-4f49-9dc2-2ecdf3887223',
  memberRole: 'user',
  nickname: 'mechanic',
  ssafyMember: null,
};
const ssafyUserInfo: UserInfo = {
  ...initialUserInfo,
  ssafyMember: true,
  ssafyInfo: {
    year: 1,
    campus: '구미',
    isMajor: false,
    certificationState: 'UNCERTIFIED',
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
