import { useEffect } from 'react';

export const useAutoReSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  maxHeight?: number
) => {
  useEffect(() => {
    if (!textAreaRef) return;

    if (maxHeight) {
      if (textAreaRef.scrollHeight >= maxHeight) {
        return;
      }
    }

    textAreaRef.style.height = '0px';
    const scrollHeight = textAreaRef.scrollHeight;

    textAreaRef.style.height = scrollHeight + 'px';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};
