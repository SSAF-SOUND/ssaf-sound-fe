import type { UserInfo } from '~/services/member/utils';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { queryKeys } from '~/react-query/common';
import { routes } from '~/utils/routes';

import {
  certifyStudent,
  getMyInfo,
  updateMyInfo,
  validateNickname,
} from './apis';

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

export const useSetMyInfo = () => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user.myInfo();
  const setMyInfo = (
    updater?: UserInfo | ((payload?: UserInfo) => UserInfo)
  ) => {
    queryClient.setQueryData<UserInfo>(queryKey, updater);
  };

  return setMyInfo;
};

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

export const useAutoSignIn = () => {
  const [tried, setTried] = useState(false);
  const { isAuthenticated } = useMyAccountStatus();

  const queryEnabled = !tried && !isAuthenticated;
  useMyInfo({ enabled: queryEnabled, retry: false });

  if (queryEnabled) {
    setTried(true);
  }
};

export const useCheckRegisterRequired = () => {
  const router = useRouter();
  const userRegisterRoute = routes.userRegister();
  const { isRegisterRequired } = useMyAccountStatus();
  const isRegisterPage = router.pathname === userRegisterRoute;

  if (!isRegisterPage && isRegisterRequired) {
    router.replace(userRegisterRoute);
  }
};

export const useUpdateMyInfo = () => {
  return useMutation({
    mutationFn: updateMyInfo,
  });
};

export const useValidateNickname = () => {
  return useMutation({
    mutationFn: validateNickname,
  });
};

export const useCertifyStudent = () => {
  return useMutation({
    mutationFn: certifyStudent,
  });
};
