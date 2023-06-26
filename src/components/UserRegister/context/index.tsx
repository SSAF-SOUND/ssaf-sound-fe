import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useContext, useState } from 'react';

import { noop } from '~/utils';

const PhaseContext = createContext(0);
const PrevPhaseContext = createContext(0);
const SetPhaseContext = createContext<Dispatch<SetStateAction<number>>>(noop);

interface UserRegisterProviderProps {
  children: ReactNode;
}

export const UserRegisterProvider = (props: UserRegisterProviderProps) => {
  const { children } = props;
  const [phase, setPhase] = useState(0);
  const [prevPhase, setPrevPhase] = useState(0);

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

export const usePhaseContext = () => {
  return useContext(PhaseContext);
};

export const usePrevPhaseContext = () => {
  return useContext(PrevPhaseContext);
};

export const useSetPhaseContext = () => {
  return useContext(SetPhaseContext);
};
