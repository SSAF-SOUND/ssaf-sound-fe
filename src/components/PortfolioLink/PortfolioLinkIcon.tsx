import { css } from '@emotion/react';

import { Icon } from '~/components/Common';

import { PortfolioLinkDataAttrKeys } from './dataAttrs';

const PortfolioLinkIcon = () => {
  return <Icon name="link" css={[selfCss, emptyHrefCss]} size={24} />;
};

export default PortfolioLinkIcon;

const selfCss = css({
  transition: 'background-color 200ms, color 200ms',
});

const emptyHrefCss = css({
  [`[${PortfolioLinkDataAttrKeys.BASE}]:not([${PortfolioLinkDataAttrKeys.HREF}]) &,
   [${PortfolioLinkDataAttrKeys.BASE}][${PortfolioLinkDataAttrKeys.HREF}=""] &`]:
    {
      opacity: 0.3,
    },
});
