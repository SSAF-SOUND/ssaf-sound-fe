import { css } from '@emotion/react';

import { position } from '~/styles/utils';

export interface EmptyListProps {
  className?: string;
  text: string;
}
export const EmptyList = (props: EmptyListProps) => {
  const { text, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      {text}
    </div>
  );
};

const selfCss = css(position.xy('center', 'center', 'absolute'));
