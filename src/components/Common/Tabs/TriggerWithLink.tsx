import type { TriggerProps } from './Trigger';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import Trigger from './Trigger';

type TriggerWithLink = {
  triggerProps: Omit<TriggerProps, 'children'>;
  linkProps: Omit<LinkProps, 'children'>;
  children: ReactNode;
};

export const TriggerWithLink = (props: TriggerWithLink) => {
  const { triggerProps, linkProps, children } = props;
  return (
    <Trigger {...triggerProps} asChild>
      <Link {...linkProps}>{children}</Link>
    </Trigger>
  );
};
