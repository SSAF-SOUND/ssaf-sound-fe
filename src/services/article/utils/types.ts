import type { UserInfo } from '~/services/member';

export interface ArticleCategory {
  boardId: number;
  title: string;
}

export interface ArticleImage {
  imageUrl: string;
}

/* NOTE 
    - author 는 아직 반영 확정 X
    - category 데이터도 필요 (TitleBar)
*/
export interface ArticleDetail {
  title: string;
  content: string;

  likeCount: number;
  commentCount: number;
  scrapCount: number;

  liked: boolean;
  scraped: boolean;

  createdAt: string;
  anonymous: boolean;
  modified: boolean;
  mine: boolean;
  images: ArticleImage[];

  // NOTE: 아직 반영이 안 된 타입
  author: Omit<UserInfo, 'memberId'>;
  category: ArticleCategory;
}

export interface ArticleDetailError {
  error: {
    isUnknownError: boolean;
    message: string;
  };
}
