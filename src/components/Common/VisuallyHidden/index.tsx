import type { ReactNode } from 'react';

import { visuallyHidden } from '~/styles/utils';

interface VisuallyHiddenProps {
  children: ReactNode;
}

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  return <span css={visuallyHidden}>{props.children}</span>;
};

export default VisuallyHidden;
