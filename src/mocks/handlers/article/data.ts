import type {
  ArticleCategory,
  ArticleDetail,
  ArticleSummary,
} from '~/services/article/utils';
import type { UserInfo } from '~/services/member';

import { faker } from '@faker-js/faker';

import { mockHtmlString } from '~/mocks/handlers/common';
import { userInfo } from '~/mocks/handlers/member/data';

export const articleCategories: ArticleCategory[] = [
  '자유',
  '취업',
  '질문',
  '맛집',
  '싸피 예비생',
].map((category, idx) => ({
  boardId: idx + 1,
  title: `${category} 게시판`,
  description: '취업에 대한 이야기를 공유해봐요!',
  imageUrl:
    'https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
}));

const imageUrls = [
  'https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1679648370654-2e5e1b4ebe2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  'https://images.unsplash.com/photo-1603959823148-f60a3f4d4b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
];

const createMockImages = (urls: string[]) => {
  return urls.map((url) => ({ imageUrl: url, imagePath: url }));
};

export const createMockArticle = (
  id: number,
  options: {
    mine?: boolean;
    liked?: boolean;
    scraped?: boolean;
    modified?: boolean;
    author?: UserInfo;
  } = {}
): ArticleDetail => {
  const {
    mine = false,
    scraped = false,
    modified = false,
    liked = false,
    author = userInfo.certifiedSsafyUserInfo,
  } = options;
  const booleanValue = Boolean(id % 2);
  const numberRange = { min: 1000, max: 100000 };
  const { boardId, title: boardTitle } = articleCategories[id % 5];
  return {
    title: `${id}번째 게시글`,
    content: mockHtmlString,
    commentCount: faker.number.int(numberRange),
    likeCount: faker.number.int(numberRange),
    scrapCount: faker.number.int(numberRange),
    createdAt: faker.date.past().toISOString(),
    mine,
    liked,
    modified,
    scraped,
    images: createMockImages(imageUrls),
    postId: id,
    anonymity: booleanValue,
    author,
    boardId,
    boardTitle,
  };
};

export const articles: ArticleDetail[] = Array(5)
  .fill(undefined)
  .map((_, index) => createMockArticle(index));

export const createMockArticleSummary = (id: number): ArticleSummary => {
  const anonymity = Boolean(id % 2);
  const numberRange = { min: 1000, max: 100000 };
  return {
    boardId: 1,
    title: faker.lorem.sentence(4),
    content: ` 
      <p>
        <strong>BOLD</strong>
      </p>
      <p>
        <u>UNDERLINE</u>
      </p>
      <p>
        <code>inline-code</code>
      </p>
      <pre class="ql-syntax" spellcheck="false">code-block</pre>
      <p><br></p>
      <ol>
        <li>ordered</li>
        <li>ordered</li>
        <li>ordered</li>
      </ol>`,
    anonymity,
    boardTitle: '자유 게시판',
    commentCount: faker.number.int(numberRange),
    createdAt: faker.date.past().toISOString(),
    likeCount: faker.number.int(numberRange),
    nickname: anonymity ? '익명' : faker.animal.dog(),
    postId: id,
    thumbnail: '',
  };
};

export const articleSummaries = Array(35)
  .fill(undefined)
  .map((_, index) => {
    return createMockArticleSummary(index);
  });
