import type { AnyFunction } from '~/types';

import { useState } from 'react';

/**
 * - 전달하는 함수가 반드시 `Promise`를 반환해야 `loading`상태가 올바르게 동기화됨.
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
