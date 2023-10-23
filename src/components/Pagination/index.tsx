import type { LinkProps } from 'next/link';
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Icon } from '~/components/Common/Icon';
import { useCallbackRef } from '~/hooks/useCallbackRef';
import { flex, fontCss, palettes } from '~/styles/utils';
import { clamp, range } from '~/utils';

const paginationClassnames = {
  trunc: 'pagination-trunc',
  leftTrunc: 'pagination-trunc__left',
  rightTrunc: 'pagination-trunc__right',
};

interface PaginationContextValues {
  currentPage: number;
  pageKey: string;
}

const PaginationContext = createContext<PaginationContextValues | null>(null);

const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (context === null) {
    throw new Error(
      '`usePaginationContext`는 `Pagination.Root`내부에서 사용해야 합니다.'
    );
  }

  return context;
};

interface PaginationRootProps {
  totalPageCount: number;

  /** 최솟값 0, default = 1 */
  siblingCount?: number; // 최소 0

  /** 최솟값 0, default = 1 */
  boundaryCount?: number; // 최소 0

  onClickPreviousButton?: (previousPage: number) => void;
  onClickNextButton?: (nextPage: number) => void;

  /** 페이지 상태를 바인딩할 `router.query`의 키 */
  pageKey?: string;

  /** 페이지가 범위를 벗어났을 때 보여줄 UI */
  invalidFallbackUI?: ReactNode;

  /** `uncontrolled`로 사용할 때만 쓰입니다. `route.query`의 page 값이 바뀔 때 set 됩니다. */
  initialPage?: number;

  /**
   * - controlled 로 사용할 때는 `page`, `onPageRouteValueChange`를 함께 사용해야합니다.
   * - `onPageRouteValueChange`는 `page`값이 `undefined`인 경우엔 호출되지 않습니다.
   */
  page?: number;
  onPageRouteValueChange?: (page: number) => void;
  disableOnPageChange?: boolean;

  truncStep?: number;
  leftTruncUI?: (page: number) => ReactElement;
  rightTruncUI?: (page: number) => ReactElement;

  /** key prop 필수 */
  itemUI?: (page: number) => ReactElement;
  ItemContainer?: FC;
}

const firstPage = 1;
const defaultBoundaryCount = 1;
const defaultSiblingCount = 1;

// ANATOMY
// leftBoundaries leftTrunc siblings rightTrunc rightBoundaries

export const PaginationRoot = (props: PaginationRootProps) => {
  const {
    pageKey = 'page',
    totalPageCount,
    onClickPreviousButton,
    onClickNextButton,
    boundaryCount: unsafeBoundaryCount = defaultBoundaryCount,
    siblingCount: unsafeSiblingCount = defaultSiblingCount,
    invalidFallbackUI,

    initialPage = 1,
    page: controlledCurrentPage,
    onPageRouteValueChange,
    disableOnPageChange = false,
    truncStep = 5,
    leftTruncUI = defaultLeftTruncUI,
    rightTruncUI = defaultRightTruncUI,

    // key prop 필수
    itemUI = defaultItemUI,
    ItemContainer = DefaultItemContainer,
  } = props;

  const router = useRouter();
  const pageRouteValue = router.query[pageKey];

  const [uncontrolledCurrentPage, setUncontrolledCurrentPage] =
    useState(initialPage);

  const currentPage = controlledCurrentPage
    ? controlledCurrentPage
    : uncontrolledCurrentPage;

  const handlePageRouteValueChange = useCallbackRef(
    controlledCurrentPage !== undefined
      ? onPageRouteValueChange
      : setUncontrolledCurrentPage
  );

  // const isFirstPage = currentPage === firstPage;
  // const isLastPage = currentPage === totalPageCount;
  const isInvalidPage = currentPage < firstPage || currentPage > totalPageCount;

  const boundaryCount = clamp(unsafeBoundaryCount, [0, totalPageCount]);
  const siblingCount = clamp(unsafeSiblingCount, [0, totalPageCount]);

  const clampRange: [number, number] = useMemo(
    () => [firstPage, totalPageCount],
    [totalPageCount]
  );

  const leftBoundaryStart = firstPage;
  const leftBoundaryEnd = boundaryCount;
  const siblingStart = clamp(currentPage - siblingCount, clampRange);
  const siblingEnd = clamp(currentPage + siblingCount, clampRange);
  const rightBoundaryStart = totalPageCount - boundaryCount + 1;
  const rightBoundaryEnd = totalPageCount;

  const skipLeftTrunc = leftBoundaryEnd >= siblingStart - 1;
  const skipRightTrunc = siblingEnd >= rightBoundaryStart - 1;

  // case1: 둘 다 스킵 -> lBS ~ rBE까지 그림 ->
  // case2: 왼쪽만 스킵 -> lBS ~ sE까지 그림 + ... rBS부터 rBE까지 그림
  // case3: 오른쪽만 스킵 -> lBS ~ lBE까지 그림 + ... + sS부터 rBE까지 그림
  // case4: 둘 다 스킵 안함 -> lBS ~ lBE까지 그림 + ... + sS부터 sE까지 그림 + ... + rBS부터 rBE까지 그림

  // 1 ... 6 7 8 ... 100
  // 1 2 3 4 5 6 ... 100
  // 1 ... 95 96 97 98 99 100
  // 1 2 3 4 5 6 7 8

  // 1. lBS ~ lBE 까지 그림
  // 2. 왼쪽 스킵 ? lBE + 1부터 sE까지 그림 : ... 그리고, sS부터 sE까지 그림
  // 3. 오른쪽 스킵 ? sE + 1부터 rBE까지 그림 : ... 그리고, rBS 부터 rBE까지 그림

  // const handleClickPreviousButton = () =>
  //   onClickPreviousButton?.(currentPage - 1);
  // const handleClickNextButton = () => onClickNextButton?.(currentPage + 1);

  useEffect(() => {
    if (disableOnPageChange) return;

    const target = Number(
      Array.isArray(pageRouteValue) ? pageRouteValue[0] : pageRouteValue
    );

    const safePageRouteValue = Number.isNaN(target)
      ? firstPage
      : clamp(target, [firstPage, totalPageCount]);

    handlePageRouteValueChange?.(safePageRouteValue);
  }, [
    pageRouteValue,
    totalPageCount,
    handlePageRouteValueChange,
    disableOnPageChange,
  ]);

  return (
    <PaginationContext.Provider value={{ currentPage, pageKey }}>
      {isInvalidPage && invalidFallbackUI ? (
        invalidFallbackUI
      ) : (
        <nav>
          <ItemContainer>
            {/*<li>*/}
            {/*  <IconButton*/}
            {/*    onClick={handleClickPreviousButton}*/}
            {/*    disabled={isFirstPage}*/}
            {/*  >*/}
            {/*    <Icon name="chevron.left" label="이전 페이지로 이동" />*/}
            {/*  </IconButton>*/}
            {/*</li>*/}

            {range(leftBoundaryStart, leftBoundaryEnd).map(itemUI)}

            {skipLeftTrunc ? (
              range(leftBoundaryEnd + 1, siblingEnd).map(itemUI)
            ) : (
              <>
                {leftTruncUI(Math.max(firstPage, currentPage - truncStep))}
                {range(siblingStart, siblingEnd).map(itemUI)}
              </>
            )}

            {skipRightTrunc ? (
              range(siblingEnd + 1, rightBoundaryEnd).map(itemUI)
            ) : (
              <>
                {rightTruncUI(Math.max(firstPage, currentPage + truncStep))}
                {range(rightBoundaryStart, rightBoundaryEnd).map(itemUI)}
              </>
            )}

            {/*<li>*/}
            {/*  <IconButton onClick={handleClickNextButton} disabled={isLastPage}>*/}
            {/*    <Icon name="chevron.right" label="다음 페이지로 이동" />*/}
            {/*  </IconButton>*/}
            {/*</li>*/}
          </ItemContainer>
        </nav>
      )}
    </PaginationContext.Provider>
  );
};

export interface PaginationItemProps extends Partial<LinkProps> {
  page: number;
  children?: ReactNode;
  className?: string;
}

export const PaginationItem = (props: PaginationItemProps) => {
  const { page, children = page, ...restProps } = props;
  const router = useRouter();
  const pathname = router.pathname;
  const { currentPage, pageKey } = usePaginationContext();
  const isActive = currentPage === page;

  return (
    <Link
      css={[linkCss, isActive && activeLinkCss]}
      href={{ pathname, query: { ...router.query, [pageKey]: page } }}
      {...restProps}
      aria-label={`${page}페이지로 이동`}
    >
      {children}
    </Link>
  );
};

const itemMinWidth = 32;
const itemMinHeight = 32;
const itemTextHeight = 24;

const truncCss = css({
  height: itemMinHeight,
});

const defaultLeftTruncUI = (page: number) => (
  <li
    className={[
      paginationClassnames.trunc,
      paginationClassnames.leftTrunc,
    ].join(' ')}
  >
    <PaginationItem page={page} css={truncCss}>
      <Icon name="chevron.left.double" size={itemTextHeight} aria-hidden />
    </PaginationItem>
  </li>
);
const defaultRightTruncUI = (page: number) => (
  <li
    className={[
      paginationClassnames.trunc,
      paginationClassnames.rightTrunc,
    ].join(' ')}
  >
    <PaginationItem page={page} css={truncCss}>
      <Icon name="chevron.right.double" size={itemTextHeight} aria-hidden />
    </PaginationItem>
  </li>
);
const defaultItemUI = (page: number) => (
  <li>
    <PaginationItem page={page} key={page} />
  </li>
);
const DefaultItemContainer = (
  props: PropsWithChildren<{ className?: string }>
) => <ul css={itemContainerCss} {...props} />;

const itemContainerCss = css({}, flex('center', 'center', 'row', 6, 'wrap'));
const linkCss = css(
  {
    userSelect: 'none',
    transition: 'color 200ms, background-color 200ms',
    minWidth: itemMinWidth,
    minHeight: itemMinHeight,
    padding: 4,
    borderRadius: 8,
    color: palettes.black,
    backgroundColor: palettes.grey4,
    '&:hover, &:focus-visible': {
      backgroundColor: palettes.primary.light,
    },
    '&:active': {
      backgroundColor: palettes.primary.dark,
      color: palettes.white,
    },
  },
  fontCss.style.R14,
  fontCss.family.pretendard,
  flex('center', 'center')
);
const activeLinkCss = css(
  {
    color: palettes.white,
    backgroundColor: palettes.primary.dark,
    '&:hover, &:focus-visible': { backgroundColor: palettes.primary.dark },
  },
  fontCss.style.B14
);

const Pagination = {
  Root: PaginationRoot,
  Item: PaginationItem,
};

export { Pagination, usePaginationContext, paginationClassnames };
