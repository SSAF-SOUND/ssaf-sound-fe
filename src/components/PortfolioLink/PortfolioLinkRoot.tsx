import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Slot } from '@radix-ui/react-slot';

import { fontCss, inlineFlex, palettes } from '~/styles/utils';

import { PortfolioLinkDataAttrKeys } from './dataAttrs';

interface PortfolioLinkRootProps extends ComponentPropsWithoutRef<'a'> {
  children?: ReactNode;
  asChild?: boolean;
}

const PortfolioLinkRoot = (props: PortfolioLinkRootProps) => {
  const { asChild = false, href, ...restProps } = props;
  const Component = asChild ? Slot : 'a';

  const dataAttrs = {
    [PortfolioLinkDataAttrKeys.BASE]: true,
    [PortfolioLinkDataAttrKeys.HREF]: href,
  };

  return (
    <Component
      href={asChild ? undefined : href}
      css={selfCss}
      {...dataAttrs}
      {...restProps}
    />
  );
};

export default PortfolioLinkRoot;

const color = 'red';
const selfCss = css(
  {
    userSelect: 'none',
    padding: '0 20px',
    height: 44,
    borderRadius: 40,
    border: `1.5px solid ${color}`,
    color: color,
    transition: 'background-color 200ms',
    ':active': {
      color: palettes.font.grey,
      backgroundColor: color,
    },
  },
  inlineFlex('center', 'center', 'row', 12),
  fontCss.style.B14,
  fontCss.family.auto
);
