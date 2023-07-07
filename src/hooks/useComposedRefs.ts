// https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx
import type { MutableRefObject, Ref } from 'react';

import { useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

const setRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== undefined && ref !== null) {
    (ref as MutableRefObject<T>).current = value;
  }
};

const composeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
};

export const useComposedRefs = <T>(...refs: PossibleRef<T>[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
};
