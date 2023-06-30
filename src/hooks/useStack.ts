import { useCallback, useState } from 'react';

interface UseStackOptions<DefaultTop> {
  defaultTop?: DefaultTop;
}

export const useStack = <T, DefaultTop extends T | undefined>(
  initialStack: T[],
  options: UseStackOptions<DefaultTop> = {}
) => {
  const { defaultTop } = options;
  const [stack, setStack] = useState(initialStack);
  const top = (stack.at(-1) || defaultTop) as DefaultTop extends T
    ? T
    : T | undefined;

  const push = useCallback((value: T) => {
    setStack((prevStack) => [...prevStack, value]);
  }, []);

  const pop = useCallback(() => {
    setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    return top;
  }, [top]);

  return { push, pop, stack, top };
};
