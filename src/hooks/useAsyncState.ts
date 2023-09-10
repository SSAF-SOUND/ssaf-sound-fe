import type { AnyFunction } from '~/types';

import { useState } from 'react';

/**
 * - 비동기 함수를 전달하여, 해당 함수를 래핑한 함수인 `handleAsync`를 반환하고, `handleAsync`의 진행 상태를 반환합니다.
 * - 전달하는 함수가 반드시 `Promise`를 반환해야 `loading`상태가 올바르게 동기화됩니다.
 */
export const useAsyncState = <T extends AnyFunction>(fn: T) => {
  const [loading, setLoading] = useState(false);

  const handleAsync = async (...params: Parameters<typeof fn>) => {
    setLoading(true);

    try {
      await fn(...params);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleAsync,
  };
};
