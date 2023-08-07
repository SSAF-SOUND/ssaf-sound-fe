import type { ComponentPropsWithoutRef, Ref, ChangeEvent } from 'react';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useRef } from 'react';

import { useAutofocus } from '~/hooks';
import { useComposedRefs } from '~/hooks/useComposedRefs';

import { CommentTextAreaSafeGuards } from './utils';

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  autoFocus?: boolean;
  valueOnChange?(value: string): void;
  defaultValue?: string;
  value?: string;
}

export const TextArea = forwardRef(
  (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      autoFocus = false,
      value = undefined,
      defaultValue = value ? undefined : '',
      valueOnChange,
      disabled,
      ...restProps
    } = props;
    CommentTextAreaSafeGuards({ value, defaultValue, valueOnChange });
    const isControlled = !!value && !!valueOnChange;

    const [internalValue, setInternalValue] = useControllableState({
      defaultProp: defaultValue,
      prop: value,
      onChange: valueOnChange,
    });

    const focusRef = useAutofocus<HTMLTextAreaElement>(() => autoFocus);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const composedRefs = useComposedRefs(textAreaRef, focusRef, ref);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled) return;
      setInternalValue(e.target.value);
    };

    return (
      <textarea
        value={isControlled ? internalValue : undefined}
        defaultValue={isControlled ? undefined : internalValue}
        onChange={handleOnChange}
        ref={composedRefs}
        {...restProps}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
