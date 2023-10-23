import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';
import { useState } from 'react';

import { Icon } from '~/components/Common/Icon';
import { disableArgs } from '~/stories/utils';

import { Pagination, paginationClassnames, PaginationItem } from './index';

const meta: Meta<typeof Pagination.Root> = {
  title: 'Navigation/Pagination',
  tags: ['autodocs'],
  component: Pagination.Root,
  args: { ...disableArgs(['onClickPreviousButton', 'onClickNextButton']) },
};

export default meta;

type PaginationStory = StoryObj<typeof Pagination.Root>;
export const Default: PaginationStory = {
  args: {
    totalPageCount: 100,
    initialPage: 1,
  },
  render: function Render(args) {
    const { initialPage, ...restProps } = args;
    const [currentPage, setCurrentPage] = useState(initialPage);

    return (
      <Pagination.Root
        {...restProps}
        page={currentPage}
        itemUI={(page) => (
          <Pagination.Item page={page} onClick={() => setCurrentPage(page)} />
        )}
        leftTruncUI={(page) => (
          <li
            className={[
              paginationClassnames.trunc,
              paginationClassnames.leftTrunc,
            ].join(' ')}
            onClick={() => setCurrentPage(page)}
          >
            <PaginationItem page={page} css={truncCss}>
              <Icon
                name="chevron.left.double"
                size={itemTextHeight}
                css={truncIconCss}
                aria-hidden
              />
              <div css={truncTextCss}>{page}</div>
            </PaginationItem>
          </li>
        )}
        rightTruncUI={(page) => (
          <li
            className={[
              paginationClassnames.trunc,
              paginationClassnames.leftTrunc,
            ].join(' ')}
            onClick={() => setCurrentPage(page)}
          >
            <PaginationItem page={page} css={truncCss}>
              <Icon
                name="chevron.right.double"
                size={itemTextHeight}
                css={truncIconCss}
                aria-hidden
              />
              <div css={truncTextCss}>{page}</div>
            </PaginationItem>
          </li>
        )}
      />
    );
  },
};

const itemMinHeight = 32;
const itemTextHeight = 24;

const truncIconCss = css({
  transition: 'opacity 100ms, transform 200ms',
  [`.${paginationClassnames.trunc}:hover &`]: {
    transform: `translate3d(0, -${itemTextHeight}px, 0)`,
    opacity: 0,
    position: 'absolute'
  },
});
const truncTextCss = css({
  transition: 'opacity 100ms, transform 200ms',
  position: 'absolute',
  transform: `translate3d(0, ${itemTextHeight}px, 0)`,
  opacity: 0,
  [`.${paginationClassnames.trunc}:hover &`]: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    position: 'unset'
  },
  pointerEvents: 'none',
});
const truncCss = css({
  height: itemMinHeight,
  overflow: 'hidden',
});
