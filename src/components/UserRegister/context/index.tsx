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
  const [phase, _setPhase] = useState(0);
  const [prevPhase, setPrevPhase] = useState(0);
  const setPhase: typeof _setPhase = (param) => {
    setPrevPhase(phase);
    _setPhase(param);
  };

  return (
    <SetPhaseContext.Provider value={setPhase}>
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
