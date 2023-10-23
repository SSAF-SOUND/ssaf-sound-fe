export type ScrapStatus = {
  scraped: boolean;
  scrapCount: number;
};

export type LikeStatus = {
  liked: boolean;
  likeCount: number;
};

export type InfiniteParams = {
  cursor?: number;
  size: number;
};

export type PaginationParams = {
  page?: number;
  size: number;
};

export type PaginationStatus = {
  currentPage: number;
  totalPageCount: number;
};

export type PublicRequestOption = {
  publicRequest?: boolean;
};
