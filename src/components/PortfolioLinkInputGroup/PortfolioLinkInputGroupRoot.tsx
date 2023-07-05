import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import PortfolioLink from '~/components/PortfolioLink';
import { PortfolioLinkDataAttrKeys } from '~/components/PortfolioLink/dataAttrs';
import { flex } from '~/styles/utils';

import { PortfolioLinkInputGroupRootDataAttrKeys } from './dataAttrs';

interface PortfolioLinkInputGroupRootProps {
  children: ReactNode;
  color?: string;
  viewHref?: string;
  viewText?: string;
}

const PortfolioLinkInputGroupRoot = (
  props: PortfolioLinkInputGroupRootProps
) => {
  const { children, color, viewHref = '', viewText = '' } = props;

  return (
    <PortfolioLink.Root
      color={color}
      tabIndex={0}
      asChild
      css={selfCss}
      href={viewHref}
    >
      <div {...dataAttrs}>
        <div css={viewLayerCss}>
          <PortfolioLink.Icon />
          <PortfolioLink.Text>{viewText}</PortfolioLink.Text>
        </div>
        <div css={inputLayerCss}>{children}</div>
      </div>
    </PortfolioLink.Root>
  );
};

const dataAttrs = { [PortfolioLinkInputGroupRootDataAttrKeys.BASE]: true };

export default PortfolioLinkInputGroupRoot;

const selfCss = css({
  ':not(:focus-within)': {
    cursor: 'pointer',
  },
  ':active': {
    background: 'inherit',
  },
});

const viewLayerCss = css(
  {
    [`[${PortfolioLinkInputGroupRootDataAttrKeys.BASE}]:focus-within &`]: {
      display: 'none',
    },
  },
  flex('center', 'center', 'row', 12)
);

const inputLayerCss = css(
  {
    margin: '0 -10px',
    [`[${PortfolioLinkDataAttrKeys.BASE}]:not(:focus-within) &`]: {
      display: 'none',
    },
  },
  flex('center', 'space-between', 'row', 10, 'nowrap')
);
