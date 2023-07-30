import type { UserInfo } from '~/services/member';

export interface ArticleCategory {
  boardId: number;
  title: string;
}

export interface ArticleImage {
  imageUrl: string;
}

export type ArticleAuthor =
  | {
      anonymous: false;
      author: Omit<UserInfo, 'memberId'>;
    }
  | {
      anonymous: true;
      author: Pick<UserInfo, 'nickname'>;
    };

export interface ArticleDetailWithoutAuthor {
  title: string;
  content: string;

  likeCount: number;
  commentCount: number;
  scrapCount: number;

  liked: boolean;
  scraped: boolean;

  createdAt: string;
  modified: boolean;
  mine: boolean;
  images: ArticleImage[];

  // NOTE: 아직 반영이 안 된 타입들
  postId: number;
  category: ArticleCategory;
}

export type ArticleDetail = ArticleDetailWithoutAuthor & ArticleAuthor;

export interface ArticleDetailError {
  error: {
    isUnknownError: boolean;
    message: string;
  };
}
