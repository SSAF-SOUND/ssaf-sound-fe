import type { UserInfo } from '~/services/member';

export const deletedUserDisplayNickname = '(탈퇴한 유저)';
export const deletedUserNicknamePrefix = '@';
export const isDeletedUser = (user: Pick<UserInfo, 'nickname'>) => {
  const { nickname } = user;
  return nickname.startsWith(deletedUserNicknamePrefix);
};
