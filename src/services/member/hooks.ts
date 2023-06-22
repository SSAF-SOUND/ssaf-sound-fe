import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { queryKeys } from '~/react-query/common';

import { getMyInfo } from './apis';

interface UseMyInfoOptions {
  enabled?: boolean;
  retry?: number | boolean;
}

export const useMyInfo = (options: UseMyInfoOptions = {}) => {
  const { enabled = true, retry } = options;

  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
    staleTime: Infinity,
    enabled,
    retry,
  });
};

/**
 * - `isAuthenticated`: 유저의 로그인을 여부를 나타내는 상태
 * - `isRegisterRequired`: 회원 정보 등록이 필요한지를 나타내는 상태
 * - `isChecking`: 유저의 로그인 여부를 검사중인 상태
 */
export const useMyAccountStatus = () => {
  const { data, isFetching } = useMyInfo({ enabled: false });
  const isAuthenticated = !!data;
  const isRegisterRequired = isAuthenticated && data.ssafyMember == null;
  const isChecking = !isAuthenticated && isFetching;

  return {
    isAuthenticated,
    isRegisterRequired,
    isChecking,
  };
};

export const useAutoSignIn = () => {
  const [tried, setTried] = useState(false);
  const { isAuthenticated } = useMyAccountStatus();

  const queryEnabled = !tried && !isAuthenticated;

  // `enabled`가 `false`가 되면, 쿼리가 실패해도 `retry`를 트리거하지 않음.
  useMyInfo({ enabled: queryEnabled });

  if (queryEnabled) {
    setTried(true);
  }
};

export const useCheckRegisterRequired = () => {
  const router = useRouter();
  const { isRegisterRequired } = useMyAccountStatus();

  if (isRegisterRequired) {
    router.replace('/auth/register');
  }
};
