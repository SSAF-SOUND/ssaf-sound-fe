import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

import { PortfolioLinkDataAttrKeys } from './dataAttrs';

interface PortfolioLinkTextProps {
  children?: string;
}

const defaultText = '미입력';

const PortfolioLinkText = (props: PortfolioLinkTextProps) => {
  const { children } = props;
  return (
    <span css={[selfCss, !children && emptyTextCss]}>
      {children || defaultText}
    </span>
  );
};

export default PortfolioLinkText;

const selfCss = css({
  transition: 'background-color 200ms, color 200ms',
  [`[${PortfolioLinkDataAttrKeys.BASE}]:active &`]: {
    color: palettes.font.grey,
  },
});

const emptyTextCss = css({
  opacity: 0.3,
});
