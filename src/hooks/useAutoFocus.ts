import { useEffect, useRef } from 'react';

export const useAutofocus = <ElementType extends HTMLElement>(
  condition?: () => boolean
) => {
  const ref = useRef<ElementType>(null);

  useEffect(() => {
    let focusCondition = true;
    if (condition) {
      focusCondition = condition();
    }
    if (!focusCondition) return;

    const node = ref.current;
    if (node && typeof node.focus === 'function') {
      node.focus();
    }
  }, [ref, condition]);

  return ref;
};
