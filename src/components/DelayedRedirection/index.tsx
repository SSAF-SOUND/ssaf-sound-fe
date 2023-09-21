import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { toMs } from '~/utils';

interface DelayedRedirectionProps {
  children: ReactNode;
  to: LinkProps['href'];
  seconds?: number;
  shouldReplace?: boolean;
}

const DelayedRedirection = (props: DelayedRedirectionProps) => {
  const { children, to, seconds = 3, shouldReplace = false } = props;
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldReplace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }, toMs(seconds));

    return () => clearTimeout(timer);
  }, [router, to, seconds, shouldReplace]);

  return <>{children}</>;
};

export default DelayedRedirection;
