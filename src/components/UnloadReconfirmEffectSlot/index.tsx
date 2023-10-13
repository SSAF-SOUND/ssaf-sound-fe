import type { ReactNode } from 'react';

import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';

interface UnloadReconfirmEffectSlotProps {
  children: ReactNode;
}

const UnloadReconfirmEffectSlot = (props: UnloadReconfirmEffectSlotProps) => {
  const { children } = props;

  useUnloadReconfirmEffect();

  return <>{children}</>;
};

export default UnloadReconfirmEffectSlot;
