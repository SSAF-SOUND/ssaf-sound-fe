import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { noop } from '~/utils';

import Campus from '../Fields/Campus';
import IsMajor from '../Fields/IsMajor';
import IsMember from '../Fields/IsMember';
import Nickname from '../Fields/Nickname';
import Year from '../Fields/Year';

export const fieldIds = {
  isMember: Symbol(),
  year: Symbol(),
  campus: Symbol(),
  isMajor: Symbol(),
  nickname: Symbol(),
};

const UserRegisterContext = createContext<
  | {
      fields: { id: symbol; Component: FC }[];
      fieldIds: typeof fieldIds;
    }
  | undefined
>(undefined);

const PhaseContext = createContext({
  phase: 0,
  prevPhase: 0,
});
const SetPhaseContext = createContext<Dispatch<SetStateAction<number>>>(noop);

interface UserRegisterProviderProps {
  children: ReactNode;
}

export const UserRegisterProvider = (props: UserRegisterProviderProps) => {
  const { children } = props;
  const [prevPhase, setPrevPhase] = useState(0);
  const [phase, setPhase] = useState(0);

  const extendedSetPhase: typeof setPhase = useCallback(
    (nextPhase) => {
      setPrevPhase(phase);
      setPhase(nextPhase);
    },
    [phase]
  );

  const userRegister = useMemo(() => {
    const increasePhase = () => extendedSetPhase((p) => p + 1);
    const nicknamePhase = 4;

    return {
      fields: [
        {
          id: fieldIds.isMember,
          Component: () => (
            <IsMember
              onFalse={() => extendedSetPhase(nicknamePhase)}
              onTrue={increasePhase}
            />
          ),
        },
        {
          id: fieldIds.year,
          Component: () => <Year onSelect={increasePhase} />,
        },
        {
          id: fieldIds.campus,
          Component: () => <Campus onSelect={increasePhase} />,
        },
        {
          id: fieldIds.isMajor,
          Component: () => (
            <IsMajor onFalse={increasePhase} onTrue={increasePhase} />
          ),
        },
        {
          id: fieldIds.nickname,
          Component: () => <Nickname />,
        },
      ],
      fieldIds,
    };
  }, [extendedSetPhase]);

  const phaseValue = useMemo(() => {
    return {
      phase,
      prevPhase,
    };
  }, [phase, prevPhase]);

  return (
    <UserRegisterContext.Provider value={userRegister}>
      <SetPhaseContext.Provider value={extendedSetPhase}>
        <PhaseContext.Provider value={phaseValue}>
          {children}
        </PhaseContext.Provider>
      </SetPhaseContext.Provider>
    </UserRegisterContext.Provider>
  );
};

export const usePhase = () => {
  return useContext(PhaseContext);
};

export const useSetPhase = () => {
  return useContext(SetPhaseContext);
};

export const useUserRegister = () => {
  const contextValue = useContext(UserRegisterContext);
  if (contextValue === undefined) {
    throw new Error(
      'useUserRegister는 UserRegisterContext.Provider 내부에서 호출해야 합니다.'
    );
  }

  return contextValue;
};
