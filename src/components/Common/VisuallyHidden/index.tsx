import type { ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { visuallyHidden } from '~/styles/utils';

interface VisuallyHiddenProps {
  children: ReactNode;
  asChild?: boolean;
}

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { children, asChild = false } = props;
  const Component = asChild ? Slot : 'span';

  return <Component css={visuallyHidden}>{children}</Component>;
};

export default VisuallyHidden;
