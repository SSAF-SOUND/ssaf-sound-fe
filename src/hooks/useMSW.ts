import { useEffect, useState } from 'react';

const MOCKING_MODE =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

/**
 * - `isMSWReady`라는 state를 반환합니다.
 * - msw 세팅이 완료된 경우에 `true`가 됩니다.
 * - 개발모드가 아니거나 `NEXT_PUBLIC_API_MOCKING !== 'enabled'`라면 항상 `true`입니다.
 */
const useMSW = () => {
  const [isMSWReady, setIsMSWReady] = useState(() => !MOCKING_MODE);

  useEffect(() => {
    async function initMSW() {
      const { initMocks } = await import('~/mocks');
      await initMocks();
      setIsMSWReady(true);
    }

    if (MOCKING_MODE) {
      initMSW();
    }
  }, []);

  return isMSWReady;
};

export default useMSW;
