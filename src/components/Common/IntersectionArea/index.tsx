import type { CSSProperties, ReactNode } from 'react';

import { useCallback, useRef } from 'react';

import { useIntersectionObserver } from '~/hooks';

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
  const intersectionCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) onIntersection?.();
      else offIntersection?.();
    },
    [onIntersection, offIntersection]
  );

  useIntersectionObserver(ref, intersectionCallback);

  return <div {...restProps} ref={ref} />;
};
