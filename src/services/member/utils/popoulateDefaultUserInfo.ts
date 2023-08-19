import type { UserInfo } from '~/services/member';

/**
 * 익명 유저는 유저 정보에서 nickname 필드만 오게 되어서,
 * UserInfo 타입을 prop 으로 받는 컴포넌트에 전달할 수 없습니다.
 * 그런데 해당 컴포넌트들을 유니온 타입으로 만들면, 해당 컴포넌트의 구현 로직에서 타입 체크가 번거로워집니다.
 *
 * 익명 유저까지도 대응하는(=즉, `nickname`만 있어도 렌더링이 가능한) 컴포넌트는
 * `ssafyMember`, `isMajor`와 같은 데이터가 필요 없을 것이므로, 가짜 데이터를 넣어줘도 된다고 판단했습니다.
 **/
export const populateDefaultUserInfo = (
  userInfo: Pick<UserInfo, 'nickname'>
): Omit<UserInfo, 'memberId' | 'memberRole'> => {
  return {
    isMajor: false,
    ssafyMember: false,
    ...userInfo,
  };
};
