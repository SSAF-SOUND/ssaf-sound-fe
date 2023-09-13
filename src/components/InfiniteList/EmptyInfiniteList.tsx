import { css } from '@emotion/react';

import { position } from '~/styles/utils';

interface EmptyInfiniteListProps {
  className?: string;
  text: string;
}
const EmptyInfiniteList = (props: EmptyInfiniteListProps) => {
  const { text, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      {text}
    </div>
  );
};

export default EmptyInfiniteList;
const selfCss = css(position.xy('center', 'center', 'absolute'));
