import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';

interface NavItemProps {
  children: ReactNode;
  withStateCss?: boolean;
  withIcon?: boolean;
  asLink?: boolean;
  href?: string;
}

export const NavItem = (props: NavItemProps) => {
  const {
    children,
    href = '',
    asLink = true,
    withStateCss = true,
    withIcon = true,
  } = props;

  const Component = asLink ? Link : 'div';

  return (
    <Component href={href} css={[itemCss, withStateCss && itemStateCss]}>
      {children}
      {withIcon && <Icon name="chevron.right" size={20} />}
    </Component>
  );
};

interface NavButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

export const NavButton = (props: NavButtonProps) => {
  return <button css={[itemCss, itemStateCss]} type="button" {...props} />;
};

const itemCss = css(
  {
    height: 46,
    padding: '0 25px',
    outline: 0,
    color: palettes.white,
  },
  flex('center', 'space-between', 'row'),
  fontCss.style.B18
);

const itemStateCss = css({
  backgroundColor: palettes.background.default,
  transition: 'background-color 200ms',
  ':hover': {
    backgroundColor: palettes.background.grey,
  },
  ':active': {
    backgroundColor: palettes.grey.dark,
  },
  ':disabled': {
    pointerEvents: 'none',
    color: colorMix('50%', palettes.white),
  },
  ':focus-visible': {
    backgroundColor: palettes.background.grey,
  },
});
