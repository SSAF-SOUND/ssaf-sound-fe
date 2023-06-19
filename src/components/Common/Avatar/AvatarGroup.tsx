import type { ReactNode, ComponentPropsWithoutRef, ReactElement } from 'react';

import { css } from '@emotion/react';
import { Children, cloneElement, isValidElement } from 'react';

import { flex, fontCss } from '~/styles/utils';

export interface AvatarGroupProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  max?: number;
}
const AvatarGroup = (props: AvatarGroupProps) => {
  const { children, max = 4, ...rest } = props;

  const validAvatars = Children.toArray(children).filter(isValidElement);

  const visibleAvatars = validAvatars
    .slice(0, max)
    .map((avatar, index, avatars) => {
      return cloneElement(avatar as ReactElement, {
        style: {
          zIndex: avatars.length - index,
        },
      });
    });

  const restAvatarsNumber = validAvatars.length - max;

  return (
    <div css={selfCss} {...rest}>
      {visibleAvatars}
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
