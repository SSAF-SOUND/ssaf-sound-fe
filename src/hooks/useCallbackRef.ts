/* https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx */

import { useRef, useEffect, useMemo } from 'react';

export const useCallbackRef = <T extends (...args: any[]) => any>(
  callback: T | undefined
): T => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
};
