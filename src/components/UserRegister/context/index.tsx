import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useContext, useState } from 'react';

import { noop } from '~/utils';

const PhaseContext = createContext(0);
const SetPhaseContext = createContext<Dispatch<SetStateAction<number>>>(noop);

interface UserRegisterProviderProps {
  children: ReactNode;
}

export const UserRegisterProvider = (props: UserRegisterProviderProps) => {
  const { children } = props;
  const [phase, setPhase] = useState(0);

  return (
    <SetPhaseContext.Provider value={setPhase}>
      <PhaseContext.Provider value={phase}>{children}</PhaseContext.Provider>
    </SetPhaseContext.Provider>
  );
};

export const usePhaseContext = () => {
  return useContext(PhaseContext);
};

export const useSetPhaseContext = () => {
  return useContext(SetPhaseContext);
};
