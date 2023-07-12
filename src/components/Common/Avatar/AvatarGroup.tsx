import type { ReactNode, ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { Children, isValidElement } from 'react';

import { flex, fontCss } from '~/styles/utils';

import SingleAvatar from './SingleAvatar';

export interface AvatarGroupProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  visibleCount?: number;
}
const AvatarGroup = (props: AvatarGroupProps) => {
  const { children, visibleCount = 4, ...rest } = props;

  const validAvatars = Children.toArray(children).filter(isValidElement);

  const visibleAvatars = validAvatars.slice(0, visibleCount);

  const restAvatarsNumber = validAvatars.length - visibleCount;
  const emptyAvatarsNumber = visibleCount - validAvatars.length;

  return (
    <div css={selfCss} {...rest}>
      {visibleAvatars}
      {Array.from({ length: emptyAvatarsNumber }).map((_, i) => (
        <SingleAvatar isEmpty key={i} />
      ))}
      {restAvatarsNumber > 0 && <span css={textCss}>+{restAvatarsNumber}</span>}
    </div>
  );
};

const selfCss = css(
  {
    '> div': {
      marginLeft: -2,
    },
  },
  flex('center', 'center', 'row')
);

const textCss = css(fontCss.style.R12);

export default AvatarGroup;
