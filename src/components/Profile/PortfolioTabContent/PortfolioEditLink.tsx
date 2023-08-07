import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { palettes } from '~/styles/utils';
import { routes } from '~/utils';

interface PortfolioEditLinkProps {
  className?: string;
}

const PortfolioEditLink = (props: PortfolioEditLinkProps) => {
  return (
    <Button
      asChild
      size="md"
      theme="grey"
      variant="filled"
      css={selfCss}
      {...props}
    >
      <Link href={routes.profile.edit.portfolio()}>입력하기</Link>
    </Button>
  );
};

export default PortfolioEditLink;

const selfCss = css({
  color: palettes.white,
  width: '100%',
});
