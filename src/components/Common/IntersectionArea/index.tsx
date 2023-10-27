import type { CSSProperties, ReactNode } from 'react';

import { useCallback, useRef } from 'react';

import { useIntersectionObserver } from '~/hooks';
import { useCallbackRef } from '~/hooks/useCallbackRef';

export interface IntersectionAreaProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onIntersection?: () => void;
  offIntersection?: () => void;
}

export const IntersectionArea = (props: IntersectionAreaProps) => {
  const { onIntersection, offIntersection, ...restProps } = props;
  const ref = useRef<HTMLDivElement>(null);

  const memoizedOnIntersection = useCallbackRef(onIntersection);
  const memoizedOffIntersection = useCallbackRef(offIntersection);

  const intersectionCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) memoizedOnIntersection?.();
      else memoizedOffIntersection?.();
    },
    [memoizedOnIntersection, memoizedOffIntersection]
  );

  useIntersectionObserver(ref, intersectionCallback);

  return <div {...restProps} ref={ref} />;
};
