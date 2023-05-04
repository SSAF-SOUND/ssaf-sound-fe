import type { FC, ReactNode } from 'react';

import React from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { incrementByAmount } from '~/store/reducers/counterSlice';

interface CounterProps {
  children?: ReactNode;
}

const Counter: FC<CounterProps> = ({}) => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(incrementByAmount(3));
  };

  return (
    <section>
      <h2>Redux Test - Counter: {value}</h2>
      <button type="button" onClick={onClick} style={{ width: 100, height: 30, fontSize: 20 }}>
        +3
      </button>
    </section>
  );
};

export default Counter;
