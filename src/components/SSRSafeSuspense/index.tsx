import type { ComponentPropsWithoutRef } from 'react';

import React, { Suspense } from 'react';

import useIsClient from '~/hooks/ssr/useIsClient';

export interface SSRSafeSuspenseProps
  extends ComponentPropsWithoutRef<typeof Suspense> {}

export default function SSRSafeSuspense(props: SSRSafeSuspenseProps) {
  const isClient = useIsClient();

  if (isClient) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
}
