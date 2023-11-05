import { useEffect, useRef, useState } from 'react';

export const enum WindowScrollDirection {
  UP = 'up',
  DOWN = 'down',
}

export const useWindowScrollDirection = (
  initialValue: WindowScrollDirection
) => {
  const [windowScrollDirection, setWindowScrollDirection] =
    useState<WindowScrollDirection>(initialValue);
  const y = useRef(0);

  useEffect(() => {
    y.current = window.scrollY;

    const onScroll = () => {
      const nextY = window.scrollY;

      if (nextY === y.current) return;

      const nextWindowScrollDirection =
        nextY > y.current
          ? WindowScrollDirection.DOWN
          : WindowScrollDirection.UP;

      if (nextWindowScrollDirection !== windowScrollDirection)
        setWindowScrollDirection(nextWindowScrollDirection);

      y.current = nextY;
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [windowScrollDirection]);

  return { windowScrollDirection };
};
