import { useId } from 'react';

import Answer from './Answer';
import Question from './Question';

export const Quiz = () => {
  const answerId = useId();

  return (
    <div>
      <label htmlFor={answerId}>
        <Question />
        <p>인증 횟수는 총 3회 주어집니다!</p>
      </label>

      <Answer fieldId={answerId} />
    </div>
  );
};
