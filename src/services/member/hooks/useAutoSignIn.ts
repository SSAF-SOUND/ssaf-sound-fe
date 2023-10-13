import { useState } from 'react';

import { useMyAccountStatus } from '~/services/member/hooks/useMyAccountStatus';
import { useMyInfo } from '~/services/member/hooks/useMyInfo';

export const useAutoSignIn = () => {
  const [tried, setTried] = useState(false);
  const { isAuthenticated } = useMyAccountStatus();

  const queryEnabled = !tried && !isAuthenticated;
  useMyInfo({ enabled: queryEnabled, retry: false });

  if (queryEnabled) {
    setTried(true);
  }
};
