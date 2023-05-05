import type { FC, ReactNode } from 'react';

import { css } from '@emotion/react';
import React from 'react';

interface EmotionComponentProps {
  children?: ReactNode;
}

const EmotionComponent: FC<EmotionComponentProps> = ({}) => {
  return (
    <section>
      <h2 css={itemCss}>Emotion Test</h2>
    </section>
  );
};

const itemCss = css({
  backgroundColor: 'red',
});

export default EmotionComponent;
