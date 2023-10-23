import type { PaginationStatus } from '~/services/common';

import {
  defaultArticlesFirstPage,
  defaultArticlesPageOffset,
} from '~/services/article/apis/constants';

export const isValidPage = (params: PaginationStatus) => {
  const { currentPage, totalPageCount } = params;
  return (
    defaultArticlesFirstPage <= currentPage && currentPage <= totalPageCount
  );
};

export const toSafePageValue = (unsafePage?: string | string[]) => {
  unsafePage = Array.isArray(unsafePage) ? unsafePage[0] : unsafePage;
  const unsafePageNumber = Number(unsafePage);
  return Number.isNaN(unsafePageNumber)
    ? defaultArticlesPageOffset
    : unsafePageNumber;
};
