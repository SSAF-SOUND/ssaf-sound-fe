import type { UserInfo } from '~/services/member';

export interface ArticleCategory {
  boardId: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ArticleImage {
  imageUrl: string;
  imagePath: string;
}

export type ArticleAuthor =
  | {
      anonymity: false;
      author: Omit<UserInfo, 'memberId'>;
    }
  | {
      anonymity: true;
      author: Pick<UserInfo, 'nickname'>;
    };

export interface ArticleDetailWithoutAuthor {
  postId: number;

  boardId: number;
  boardTitle: string;

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
}

export type ArticleDetail = ArticleDetailWithoutAuthor & ArticleAuthor;

export interface ArticleSummary {
  postId: number;

  boardId: number;
  boardTitle: string;

  title: string;
  content: string;

  likeCount: number;
  commentCount: number;

  createdAt: string;
  nickname: string;
  anonymity: boolean;
  thumbnail: string; // 안 쓰임
}

export interface HotArticleSummary extends ArticleSummary {}
