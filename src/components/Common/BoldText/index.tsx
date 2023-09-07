import type { ReactNode } from 'react';

export interface BoldTextProps {
  children: ReactNode;
}

export const BoldText = (props: BoldTextProps) => {
  return <strong css={{ fontWeight: 700 }} {...props} />;
};
