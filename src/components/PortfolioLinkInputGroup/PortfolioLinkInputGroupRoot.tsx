import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import PortfolioLink from '~/components/PortfolioLink';
import { flex, visuallyHidden } from '~/styles/utils';

import { classnames as cn } from './classnames';

interface PortfolioLinkInputGroupRootProps {
  children: ReactNode;
  className?: string;
  color?: string;
  viewHref?: string;
  viewText?: string;
}

const PortfolioLinkInputGroupRoot = (
  props: PortfolioLinkInputGroupRootProps
) => {
  const { children, className, color, viewHref = '', viewText = '' } = props;
  const classNames = [className, cn.root].filter(Boolean).join(' ');

  return (
    <PortfolioLink.Root
      color={color}
      tabIndex={0}
      asChild
      className={classNames}
      css={selfCss}
      href={viewHref}
    >
      <div>
        <div css={viewLayerCss}>
          <PortfolioLink.Text>{viewText}</PortfolioLink.Text>
        </div>
        <div css={inputLayerCss}>{children}</div>
      </div>
    </PortfolioLink.Root>
  );
};

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
    [`.${cn.root}:focus-within &`]: visuallyHidden,
  },
  flex('center', 'center', 'row', 12)
);

const inputLayerCss = css(
  {
    margin: '0 -10px',
    [`.${cn.root}:not(:focus-within) &`]: visuallyHidden,
  },
  flex('center', 'space-between', 'row', 10, 'nowrap')
);
