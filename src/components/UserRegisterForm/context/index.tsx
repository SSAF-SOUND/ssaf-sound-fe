import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { noop } from '~/utils';

import { IsMember, Year, Campus, IsMajor, Nickname } from '../Fields';

type FieldComponent = FC<{ isMutating?: boolean }>;
type UserRegisterFormFields = { Component: FieldComponent }[];

const UserRegisterFormFieldsContext = createContext<
  UserRegisterFormFields | undefined
>(undefined);

const PhaseContext = createContext({
  phase: 0,
  prevPhase: 0,
});

const SetPhaseContext = createContext<Dispatch<SetStateAction<number>>>(noop);

interface UserRegisterFormProviderProps {
  children: ReactNode;
}

export const UserRegisterFormProvider = (
  props: UserRegisterFormProviderProps
) => {
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

  const userRegisterFormFields = useMemo(() => {
    const increasePhase = () => extendedSetPhase((p) => p + 1);
    const nicknamePhase = 4;

    const fields: UserRegisterFormFields = [
      {
        Component: () => (
          <IsMember
            onFalse={() => extendedSetPhase(nicknamePhase)}
            onTrue={increasePhase}
          />
        ),
      },
      {
        Component: () => <Year onSelect={increasePhase} />,
      },
      {
        Component: () => <Campus onSelect={increasePhase} />,
      },
      {
        Component: () => (
          <IsMajor onFalse={increasePhase} onTrue={increasePhase} />
        ),
      },
      {
        Component: () => <Nickname />,
      },
    ];

    return fields;
  }, [extendedSetPhase]);

  const phaseValue = useMemo(() => {
    return {
      phase,
      prevPhase,
    };
  }, [phase, prevPhase]);

  return (
    <UserRegisterFormFieldsContext.Provider value={userRegisterFormFields}>
      <SetPhaseContext.Provider value={extendedSetPhase}>
        <PhaseContext.Provider value={phaseValue}>
          {children}
        </PhaseContext.Provider>
      </SetPhaseContext.Provider>
    </UserRegisterFormFieldsContext.Provider>
  );
};

export const usePhase = () => {
  return useContext(PhaseContext);
};

export const useSetPhase = () => {
  return useContext(SetPhaseContext);
};

export const useUserRegisterFormFields = () => {
  const contextValue = useContext(UserRegisterFormFieldsContext);
  if (contextValue === undefined) {
    throw new Error(
      'useUserRegisterFields는 UserRegisterFormFieldsContext.Provider 내부에서 호출해야 합니다.'
    );
  }

  return contextValue;
};

export const withUserRegisterFormProvider = <T extends object>(
  Component: FC<T>
) => {
  return function WithUserRegisterFormProvider(props: T) {
    return (
      <UserRegisterFormProvider>
        <Component {...props} />
      </UserRegisterFormProvider>
    );
  };
};
