import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface NavTitleProps {
  children: string;
  className?: string;
}

const NavTitle = (props: NavTitleProps) => {
  const { children, className } = props;
  return (
    <h3 css={headingCss} className={className}>
      {children}
    </h3>
  );
};

export default NavTitle;

const headingCss = css(
  {
    marginBottom: 10,
    color: palettes.font.blueGrey,
  },
  fontCss.style.B14
);
