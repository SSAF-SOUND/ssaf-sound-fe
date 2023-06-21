import type { UserInfo } from '~/services/member/utils/types';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { queryKeys } from '~/react-query/common';
import { useMyInfo } from '~/services/member';

/**
 * App 접속시, 1회 자동 로그인을 수행합니다.
 */
const AutoSignIn = () => {
  const [tried, setTried] = useState(false);

  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData<UserInfo>(queryKeys.user.myInfo());

  const queryEnabled = !tried && !myInfo;

  // `enabled`가 `false`가 되면 쿼리를 하지 않기 때문에 retry 횟수가 없음.
  useMyInfo({ enabled: queryEnabled });

  if (queryEnabled) {
    setTried(true);
  }

  return <></>;
};

export default AutoSignIn;
