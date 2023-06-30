import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useStack } from '~/hooks/useStack';
import { noop } from '~/utils';

import { IsMember, Year, Campus, IsMajor, Nickname } from '../Fields';

type UserRegisterFormFields = { Component: FC }[];
const UserRegisterFormFieldsContext = createContext<
  UserRegisterFormFields | undefined
>(undefined);

interface PhaseContextValue {
  currentPhase: number;
  popPhase: () => number;
  pushPhase: (value: number) => void;
}
const PhaseContext = createContext<PhaseContextValue | undefined>(undefined);

interface UserRegisterFormProviderProps {
  children: ReactNode;
}

export const UserRegisterFormProvider = (
  props: UserRegisterFormProviderProps
) => {
  const { children } = props;
  const {
    push: pushPhase,
    pop: popPhase,
    top: currentPhase,
  } = useStack([0], { defaultTop: 0 });

  const userRegisterFormFields = useMemo(() => {
    const majorPhase = 3;
    const pushNextPhase = () => pushPhase(currentPhase + 1);

    const fields: UserRegisterFormFields = [
      {
        Component: () => (
          <IsMember
            onFalse={() => pushPhase(majorPhase)}
            onTrue={pushNextPhase}
          />
        ),
      },
      {
        Component: () => <Year onSelect={pushNextPhase} />,
      },
      {
        Component: () => <Campus onSelect={pushNextPhase} />,
      },
      {
        Component: () => (
          <IsMajor onFalse={pushNextPhase} onTrue={pushNextPhase} />
        ),
      },
      {
        Component: () => <Nickname />,
      },
    ];

    return fields;
  }, [pushPhase, currentPhase]);

  const phaseContextValue = useMemo(() => {
    return {
      currentPhase,
      popPhase,
      pushPhase,
    };
  }, [currentPhase, popPhase, pushPhase]);

  return (
    <UserRegisterFormFieldsContext.Provider value={userRegisterFormFields}>
      <PhaseContext.Provider value={phaseContextValue}>
        {children}
      </PhaseContext.Provider>
    </UserRegisterFormFieldsContext.Provider>
  );
};

export const usePhase = () => {
  return useContext(PhaseContext) as PhaseContextValue;
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
