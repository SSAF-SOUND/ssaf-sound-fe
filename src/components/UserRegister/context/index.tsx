import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useContext, useState } from 'react';

import { noop } from '~/utils';

const PhaseContext = createContext(0);
const PrevPhaseContext = createContext(0);
const SetPhaseContext = createContext<Dispatch<SetStateAction<number>>>(noop);

interface UserRegisterProviderProps {
  defaultPhase?: number;
  children: ReactNode;
}

export const UserRegisterProvider = (props: UserRegisterProviderProps) => {
  const { children, defaultPhase = 0 } = props;
  const [phase, setPhase] = useState(defaultPhase);
  const [prevPhase, setPrevPhase] = useState(defaultPhase);

  const extendedSetPhase: typeof setPhase = (nextPhase) => {
    setPrevPhase(phase);
    setPhase(nextPhase);
  };

  return (
    <SetPhaseContext.Provider value={extendedSetPhase}>
      <PrevPhaseContext.Provider value={prevPhase}>
        <PhaseContext.Provider value={phase}>{children}</PhaseContext.Provider>
      </PrevPhaseContext.Provider>
    </SetPhaseContext.Provider>
  );
};

export const usePhase = () => {
  return useContext(PhaseContext);
};

export const usePrevPhase = () => {
  return useContext(PrevPhaseContext);
};

export const useSetPhase = () => {
  return useContext(SetPhaseContext);
};
