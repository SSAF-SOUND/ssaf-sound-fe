import type { PaginationRootProps } from '~/components/Pagination';

import { css } from '@emotion/react';

import { Pagination } from '~/components/Pagination';

export const ResponsivePagination = (props: PaginationRootProps) => {
  return (
    <>
      <Pagination.Root
        css={[hideCss, onlySmall]}
        siblingCount={1}
        boundaryCount={1}
        {...props}
      />
      <Pagination.Root
        css={[hideCss, onlyMiddle]}
        siblingCount={2}
        boundaryCount={1}
        {...props}
      />
      <Pagination.Root
        css={[hideCss, onlyLarge]}
        siblingCount={3}
        boundaryCount={1}
        {...props}
      />
    </>
  );
};

const hideCss = css({ display: 'none' });

const onlySmall = css({
  '@media(max-width: 419px)': {
    display: 'unset',
  },
});

const onlyMiddle = css({
  '@media(min-width: 420px) and (max-width: 519px)': {
    display: 'unset',
  },
});

const onlyLarge = css({
  '@media(min-width: 520px)': {
    display: 'unset',
  },
});
