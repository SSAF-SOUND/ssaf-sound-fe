import type { SingleAvatarProps } from './SingleAvatar';
import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import { Children, isValidElement } from 'react';

import { classnames as cn } from '~/components/Common/Avatar/classnames';
import { fontCss, inlineFlex } from '~/styles/utils';

import SingleAvatar from './SingleAvatar';

const maxVisibleCount = 4;

export interface AvatarGroupProps {
  children: ReactNode;
  visibleCount?: number;
  maxCount: number;
  overridableSize?: SingleAvatarProps['size'];
}
const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    children,
    maxCount,
    visibleCount = maxCount > maxVisibleCount ? maxVisibleCount : maxCount,
    overridableSize,
    ...rest
  } = props;

  const validAvatars = Children.toArray(children).filter(
    isValidElement<SingleAvatarProps>
  );

  const visibleAvatars = validAvatars.slice(0, visibleCount);
  const emptyAvatarsCount = visibleCount - validAvatars.length;
  const restAvatarsCount = maxCount - visibleCount;
  const avatarSize = overridableSize
    ? overridableSize
    : validAvatars[0].props?.size || 'sm';

  return (
    <div css={selfCss} {...rest}>
      {visibleAvatars}
      {Array.from({ length: emptyAvatarsCount }).map((_, i) => (
        <SingleAvatar key={i} size={avatarSize} />
      ))}
      {restAvatarsCount > 0 && (
        <span css={[textCss, textSizeCss[avatarSize]]}>
          +{restAvatarsCount}
        </span>
      )}
    </div>
  );
};

const selfCss = css(
  { [`> .${cn.avatar}`]: { marginLeft: -4 } },
  inlineFlex('center', 'center', 'row'),
  fontCss.family.auto
);

const textCss = css({ marginLeft: 4 });
const textSizeCss = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B14),
  md2: css(fontCss.style.B14),
  lg: css(fontCss.style.B28),
};

export default AvatarGroup;
