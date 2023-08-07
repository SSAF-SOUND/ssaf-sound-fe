import type { TextAreaProps } from './UnStyled';

type safeGuardsFn = ({
  value,
  defaultValue,
  valueOnChange,
}: Pick<TextAreaProps, 'value' | 'defaultValue' | 'valueOnChange'>) => void;

export const safeGuards: safeGuardsFn = ({
  value,
  defaultValue,
  valueOnChange,
}) => {
  if (value && defaultValue) {
    throw new Error('value, defaultValue 중 하나만을 사용해주세요.');
  }

  if (value && !valueOnChange) {
    throw new Error(
      'controlled로 사용하실 때에는 value, valueOnChange를 모두 사용해주세요.'
    );
  }
};
