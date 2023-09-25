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
