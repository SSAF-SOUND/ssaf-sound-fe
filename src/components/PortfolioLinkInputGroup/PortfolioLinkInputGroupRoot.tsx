import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import PortfolioLink from '~/components/PortfolioLink';
import { flex } from '~/styles/utils';

interface PortfolioLinkInputGroupRootProps {
  viewHref?: string;
  viewText?: string;
  children: ReactNode;
}

const PortfolioLinkInputGroupRoot = (
  props: PortfolioLinkInputGroupRootProps
) => {
  const { children, viewHref = '', viewText = '' } = props;

  return (
    <PortfolioLink.Root tabIndex={0} asChild css={selfCss} href={viewHref}>
      <div data-portfolio-link-input-group={true}>
        <div css={viewLayerCss}>
          <PortfolioLink.Icon />
          <PortfolioLink.Text>{viewText}</PortfolioLink.Text>
        </div>
        <div css={inputLayerCss}>{children}</div>
      </div>
    </PortfolioLink.Root>
  );
};

export default PortfolioLinkInputGroupRoot;

const selfCss = css({
  ':active': {
    background: 'inherit',
  },
});

const viewLayerCss = css(
  {
    '[data-portfolio-link-input-group]:focus-within &': {
      display: 'none',
    },
  },
  flex('center', 'center', 'row', 12)
);

const inputLayerCss = css({
  '*:not(:focus-within) > &': {
    display: 'none',
  },
});
