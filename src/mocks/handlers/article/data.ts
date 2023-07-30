import type { ArticleCategory, ArticleDetail } from '~/services/article';

import { faker } from '@faker-js/faker';

import { userInfo } from '~/mocks/handlers/member/data';

export const articleCategories: ArticleCategory[] = [
  '자유',
  '취업',
  '테크',
  '맛집',
  '질문',
  '싸피 예비생',
].map((category, idx) => ({
  boardId: idx + 1,
  title: `${category} 게시판`,
}));

const imageUrl = process.env.NEXT_PUBLIC_MOCK_IMAGE as string;
const imagePath = process.env.NEXT_PUBLIC_MOCK_IMAGE as string;

export const createMockArticle = (id: number): ArticleDetail => {
  const booleanValue = Boolean(id % 2);
  return {
    title: `${id}번째 게시글`,
    content: `<h2>affsda</h2><p><strong>asfdasf<u>adfaf</u></strong></p><pre class="ql-syntax" spellcheck="false">asdfasf
</pre><p><br></p><ul><li>ㅁㄴㅇㄹㅁㄴㄹㅇ</li></ul><p><br></p><p>ㅁㄴㅇㄹㄴㅁㄹ</p><p><br></p><ol><li>ㅁㄴㅇㄹ<a href="https://www.naver.com" rel="noopener noreferrer" target="_blank">ㄴㅁㄹㅇㄴㅁㄹㄴㅁ</a></li><li><a href="https://www.naver.com" rel="noopener noreferrer" target="_blank">ㅁㄴㄹㅇㄴㅁ</a></li><li><a href="https://www.naver.com" rel="noopener noreferrer" target="_blank">ㅁㄴㅇㄹㅁㄴ</a></li></ol><ul><li><a href="https://www.naver.com" rel="noopener noreferrer" target="_blank">ㄹㄴㅁㄹ</a></li></ul>`,
    commentCount: faker.number.int(100),
    likeCount: faker.number.int(100),
    scrapCount: faker.number.int(100),
    createdAt: faker.date.past().toISOString(),
    mine: booleanValue,
    liked: booleanValue,
    modified: booleanValue,
    scraped: booleanValue,
    images: [
      { imageUrl, imagePath },
      { imageUrl, imagePath },
      { imageUrl, imagePath },
    ],
    postId: id,
    anonymous: booleanValue,
    author: userInfo.certifiedSsafyUserInfo,
    category: {
      boardId: 1,
      title: '자유 게시판',
    },
  };
};

export const articles: ArticleDetail[] = Array(5)
  .fill(undefined)
  .map((_, index) => createMockArticle(index));

// TODO: 없는 article 요청시 응답할 데이터로 바꾸기
export const articleFallback = createMockArticle(100);
