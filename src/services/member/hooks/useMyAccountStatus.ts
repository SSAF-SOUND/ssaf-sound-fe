import { useMyInfo } from '~/services/member/hooks/useMyInfo';

/**
 * - `isAuthenticated`: 유저의 로그인을 여부를 나타내는 상태
 * - `isRegisterRequired`: 회원 정보 등록이 필요한지를 나타내는 상태
 * - `isChecking`: 유저의 로그인 여부를 검사중인 상태
 */
export const useMyAccountStatus = () => {
  const { data: myInfo, isFetching } = useMyInfo({ enabled: false });
  const isAuthenticated = !!myInfo;
  const isRegisterRequired = isAuthenticated && myInfo.ssafyMember == null;
  const isChecking = !isAuthenticated && isFetching;

  return {
    isAuthenticated,
    isRegisterRequired,
    isChecking,
    myInfo,
  };
};
