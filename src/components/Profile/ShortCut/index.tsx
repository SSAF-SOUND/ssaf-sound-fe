import type { LinkProps } from 'next/link';
import type { IconProps } from '~/components/Common';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ShortCutProps {
  className?: string;
  href: LinkProps['href'];
  iconName: IconProps['name'];
  text: string;
}

const ShortCut = (props: ShortCutProps) => {
  const { href, iconName, text, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      <Link css={linkBarCss} href={href}>
        <Icon name={iconName} color={palettes.primary.default} size={28} />
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default ShortCut;

const selfCss = css(
  {
    width: 'auto',
    height: 44,
    backgroundColor: palettes.background.grey,
    padding: '0 20px',
  },
  flex('flex-start', 'center'),
  fontCss.style.B16
);
const linkBarCss = css(flex('center', '', 'row', 10));
