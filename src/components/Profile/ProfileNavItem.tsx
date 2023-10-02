import type { LinkProps } from 'next/link';
import type { IconProps } from '~/components/Common/Icon';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common/Icon';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ProfileNavItemProps {
  className?: string;
  href: LinkProps['href'];
  iconName: IconProps['name'];
  text: string;
}

const ProfileNavItem = (props: ProfileNavItemProps) => {
  const { iconName, text, ...restProps } = props;
  return (
    <Link css={selfCss} {...restProps}>
      <Icon name={iconName} color={palettes.primary.default} size={28} />
      <span>{text}</span>
    </Link>
  );
};

export default ProfileNavItem;

const selfCss = css(
  {
    width: 'auto',
    height: 44,
    backgroundColor: palettes.background.grey,
    padding: '0 20px',
    transition: 'background-color 200ms',
    outline: 0,
    ':hover, :focus-visible': {
      backgroundColor: palettes.grey.dark,
    },
    ':active': {
      backgroundColor: palettes.grey.default,
    },
  },
  fontCss.style.B16,
  flex('center', '', 'row', 10)
);
