import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useCallbackRef } from '~/hooks/useCallbackRef';
import { clamp, range } from '~/utils';

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
  siblingCount?: number; // 최소 0
  boundaryCount?: number; // 최소 0

  onClickPreviousButton?: (previousPage: number) => void;
  onClickNextButton?: (nextPage: number) => void;
  pageKey?: string;
  invalidFallbackUI?: ReactNode;

  /** uncontrolled */
  initialPage?: number;

  /**
   * - controlled 로 사용할 때는 `page`, `onPageChange`를 함께 사용해야합니다.
   * - `onPageChange`는 `page`값이 `undefined`인 경우엔 호출되지 않습니다.
   */
  page?: number;
  onPageChange?: (page: number) => void;
  disableOnPageChange?: boolean;

  truncStep?: number;
  leftTruncUI?: ReactNode;
  rightTruncUI?: ReactNode;
  itemUI?: (page: number) => ReactElement;
  ItemContainer?: FC;
}

const firstPage = 1;
const defaultTruncUI = '...';
const defaultItemUI = (page: number) => (
  <PaginationItem page={page} key={page} />
);
const defaultItemContainer = (
  props: PropsWithChildren<{ className?: string }>
) => <ul {...props} />;

// ANATOMY
// leftBoundaries leftTrunc siblings rightTrunc rightBoundaries

export const PaginationRoot = (props: PaginationRootProps) => {
  const {
    pageKey = 'page',
    totalPageCount,
    onClickPreviousButton,
    onClickNextButton,
    boundaryCount: unsafeBoundaryCount = 1,
    siblingCount: unsafeSiblingCount = 1,
    invalidFallbackUI,

    initialPage = 1,
    page: controlledCurrentPage,
    onPageChange: onControlledCurrentPageChange,
    disableOnPageChange = false,
    truncStep = 5,
    leftTruncUI = defaultTruncUI,
    rightTruncUI = defaultTruncUI,

    // key prop 필수
    itemUI = defaultItemUI,
    ItemContainer = defaultItemContainer,
  } = props;

  const router = useRouter();
  const pageRouteValue = router.query[pageKey];

  const [uncontrolledCurrentPage, setUncontrolledCurrentPage] =
    useState(initialPage);

  const currentPage = controlledCurrentPage
    ? controlledCurrentPage
    : uncontrolledCurrentPage;

  const onCurrentPageChange = useCallbackRef(
    controlledCurrentPage !== undefined
      ? onControlledCurrentPageChange
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

    onCurrentPageChange?.(safePageRouteValue);
  }, [
    pageRouteValue,
    totalPageCount,
    onCurrentPageChange,
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
                <PaginationItem
                  page={Math.max(firstPage, currentPage - truncStep)}
                >
                  {leftTruncUI}
                </PaginationItem>
                {range(siblingStart, siblingEnd).map(itemUI)}
              </>
            )}

            {skipRightTrunc ? (
              range(siblingEnd + 1, rightBoundaryEnd).map(itemUI)
            ) : (
              <>
                <PaginationItem
                  page={Math.max(firstPage, currentPage + truncStep)}
                >
                  {rightTruncUI}
                </PaginationItem>
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

export interface PaginationItemProps {
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
    <li {...restProps}>
      <Link
        css={[linkCss, isActive && activeLinkCss]}
        href={{ pathname, query: { ...router.query, [pageKey]: page } }}
      >
        {children}
      </Link>
    </li>
  );
};

const linkCss = css({});
const activeLinkCss = css({});

export const Pagination = {
  Root: PaginationRoot,
  Item: PaginationItem,
};

export { usePaginationContext };
