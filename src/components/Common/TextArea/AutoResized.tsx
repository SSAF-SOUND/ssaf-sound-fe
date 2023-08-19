import type { TextAreaProps } from './UnStyled';
import type { Ref } from 'react';

import { forwardRef, useRef, useState } from 'react';

import { useComposedRefs } from '~/hooks/useComposedRefs';

import { TextArea } from './UnStyled';
import { useAutoReSizeTextArea } from './useAutoReSizeTextArea';

/**
 * AutoResized 버전은 내부의 상태를 꼭 이용해야만 해요.
 */
type DefaultValueOmittedType = Omit<TextAreaProps, 'defaultValue'>;

export interface AutoReSizedTextAreaProps extends DefaultValueOmittedType {
  maxHeight?: number;
}

export const AutoResizedTextArea = forwardRef(
  (props: AutoReSizedTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      value = '',
      maxHeight = 94,
      valueOnChange: theirOnChange,
      ...restProps
    } = props;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(value);

    useAutoReSizeTextArea(textAreaRef.current, internalValue, maxHeight);

    const composedRef = useComposedRefs(textAreaRef, ref);

    return (
      <TextArea
        ref={composedRef}
        valueOnChange={(value) => {
          setInternalValue(value);
          theirOnChange?.(value);
        }}
        value={internalValue}
        {...restProps}
      />
    );
  }
);

AutoResizedTextArea.displayName = 'AutoReSizedTextArea';
