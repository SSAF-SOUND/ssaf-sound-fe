import type { PaginationStatus } from '~/services/common';

import {
  defaultArticlesFirstPage,
  defaultArticlesPageOffset,
} from '~/services/article/apis/constants';

export const validatePage = (params: PaginationStatus) => {
  const { currentPage, totalPageCount } = params;

  // 아무런 데이터가 없는 경우
  if (totalPageCount === 0 && currentPage === 1) {
    return true;
  }

  return (
    defaultArticlesFirstPage <= currentPage && currentPage <= totalPageCount
  );
};

export const toSafePageValue = (unsafePage?: string | string[] | number) => {
  unsafePage = Array.isArray(unsafePage) ? unsafePage[0] : unsafePage;
  const unsafePageNumber = Number(unsafePage);
  return Number.isNaN(unsafePageNumber)
    ? defaultArticlesPageOffset
    : unsafePageNumber;
};
