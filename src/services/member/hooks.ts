import type {
  ProfileVisibility,
  UserInfo,
  UserPortfolio,
} from '~/services/member/utils';

import { useRouter } from 'next/router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { queryKeys } from '~/react-query/common';
import { routes } from '~/utils/routes';

import {
  certifyStudent,
  getMyInfo,
  getMyPortfolio,
  getProfileVisibility,
  getUserInfo,
  getUserPortfolio,
  getUserProfileVisibility,
  updateIsMajor,
  updateMyInfo,
  updateMyPortfolio,
  updateNickname,
  updateProfileVisibility,
  updateSsafyBasicInfo,
  updateTrack,
  validateNickname,
} from './apis';

interface UseMyInfoOptions {
  enabled?: boolean;
  retry?: number | boolean;
}

export const useMyInfo = (options: UseMyInfoOptions = {}) => {
  const { enabled = false, retry } = options;

  return useQuery({
    queryKey: queryKeys.user.myInfo(),
    queryFn: getMyInfo,
    staleTime: Infinity,
    enabled,
    retry,
  });
};

export const useUserInfo = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user.userInfo(id),
    queryFn: () => getUserInfo(id),
  });
};

export const useSetMyInfo = () => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user.myInfo();
  const setMyInfo = (
    updater?: UserInfo | ((payload?: UserInfo) => UserInfo | undefined)
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

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: updateNickname,
  });
};

export const useUpdateIsMajor = () => {
  return useMutation({
    mutationFn: updateIsMajor,
  });
};

export const useUpdateSsafyBasicInfo = () => {
  return useMutation({
    mutationFn: updateSsafyBasicInfo,
  });
};

export const useUpdateTrack = () => {
  return useMutation({
    mutationFn: updateTrack,
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

// 프로필

export const useProfileVisibility = () => {
  return useQuery({
    queryKey: queryKeys.user.profileVisibility(),
    queryFn: getProfileVisibility,
  });
};

export const useUserProfileVisibility = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user.userProfileVisibility(id),
    queryFn: () => getUserProfileVisibility(id),
  });
};

export const useUpdateProfileVisibility = () => {
  const queryClient = useQueryClient();
  const profileVisibilityQueryKey = queryKeys.user.profileVisibility();
  const setProfileVisibility = (updater?: ProfileVisibility) =>
    queryClient.setQueryData<ProfileVisibility>(
      profileVisibilityQueryKey,
      updater
    );

  return useMutation({
    mutationFn: updateProfileVisibility,
    onMutate: async ({ isPublic }) => {
      await queryClient.cancelQueries(profileVisibilityQueryKey);
      const prevProfileVisibility = queryClient.getQueryData<ProfileVisibility>(
        profileVisibilityQueryKey
      );
      setProfileVisibility({ isPublic });
      return { prevProfileVisibility };
    },
    onError: (err, variables, context) => {
      setProfileVisibility(context?.prevProfileVisibility);
    },
  });
};

// 프로필 - 포트폴리오

interface UsePortfolioOptions {
  enabled: boolean;
}

export const useUserPortfolio = (
  id: number,
  options: Partial<UsePortfolioOptions> = {}
) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.user.portfolio(id),
    queryFn: () => getUserPortfolio(id),
    enabled,
  });
};

export const useMyPortfolio = (options: Partial<UsePortfolioOptions> = {}) => {
  const { enabled } = options;
  return useQuery({
    queryKey: queryKeys.user.myPortfolio(),
    queryFn: getMyPortfolio,
    enabled,
  });
};

export const useUpdateMyPortfolio = () => {
  const queryClient = useQueryClient();
  const setMyPortfolio = (data: UserPortfolio) =>
    queryClient.setQueryData<UserPortfolio>(queryKeys.user.myPortfolio(), data);

  return useMutation({
    mutationFn: updateMyPortfolio,
    onSuccess: (_, variables) => {
      setMyPortfolio(variables);
    },
  });
};
