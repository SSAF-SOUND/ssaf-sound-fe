import type { TriggerProps } from './Trigger';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import Trigger from './Trigger';

interface TriggerWithLinkProps extends TriggerProps {
  href: LinkProps['href'];
  children: ReactNode;
}

export const TriggerWithLink = (props: TriggerWithLinkProps) => {
  const { href, children, ...restProps } = props;
  return (
    <Trigger {...restProps} css={selfCss} asChild>
      <Link href={href}>{children}</Link>
    </Trigger>
  );
};

const selfCss = css({
  outline: 0,
});
