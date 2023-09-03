import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { fontCss } from '~/styles/utils';
import { isDevMode, routes } from '~/utils';

export const DevPageLink = () => {
  if (!isDevMode) return null;

  return (
    <Button asChild size="sm" theme="success" css={selfCss}>
      <Link href={routes.dev()}>DEV</Link>
    </Button>
  );
};

const selfCss = css({ width: 40 }, fontCss.style.B12);
