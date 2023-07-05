import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { PortfolioLinkDataAttrKeys } from '~/components/PortfolioLink/dataAttrs';
import { palettes } from '~/styles/utils';

import { classnames as cn } from './classnames';

interface PortfolioLinkTextProps {
  children?: string;
}

const defaultText = '미입력';

const PortfolioLinkText = (props: PortfolioLinkTextProps) => {
  const { children } = props;
  return (
    <>
      <Icon name="link" css={[commonCss, iconCss]} size={24} />
      <span css={[commonCss, textCss, !children && emptyCss]}>
        {children || defaultText}
      </span>
    </>
  );
};

export default PortfolioLinkText;

const commonCss = css({
  transition: 'background-color 200ms, color 200ms',
});

const textCss = css({
  [`.${cn.root}:active &`]: {
    color: palettes.font.grey,
  },
});

const emptyCss = css({
  opacity: 0.5,
});

const iconCss = css({
  [`.${cn.root}[${PortfolioLinkDataAttrKeys.HREF}=""] &`]: emptyCss,
});
