import type { ReactNode } from 'react';
import type { UrlObject } from 'url';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

interface DelayedRedirectionProps {
  children: ReactNode;
  to: UrlObject | string;
  seconds: number;
  replace?: boolean;
}

const DelayedRedirection = (props: DelayedRedirectionProps) => {
  const { children, to, seconds, replace = false } = props;
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }, seconds * 1000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default DelayedRedirection;
