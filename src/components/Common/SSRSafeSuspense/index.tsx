import type { ComponentPropsWithoutRef } from 'react';

import React, { Suspense } from 'react';

import { useIsClient } from '~/hooks/useIsClient';

export interface SSRSafeSuspenseProps
  extends ComponentPropsWithoutRef<typeof Suspense> {}

const SSRSafeSuspense = (props: SSRSafeSuspenseProps) => {
  const isClient = useIsClient();

  if (isClient) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
};

export default SSRSafeSuspense;
