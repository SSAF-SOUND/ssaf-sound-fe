import type {
  ArticleCategory,
  ArticleDetail,
  ArticleDetailError,
  ArticleSummary,
} from '~/services/article';

import { faker } from '@faker-js/faker';

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

export const createMockArticle = (id: number): ArticleDetail => {
  const booleanValue = Boolean(id % 2);
  const numberRange = { min: 1000, max: 100000 };
  return {
    title: `${id}번째 게시글`,
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
        </ol>
        <p><br></p>
        <ul>
          <li>unordered</li>
          <li>unordered</li>
          <li>unordered</li>
        </ul>
        <p>
          <br>
        </p>
        <p><a href="https://www.naver.com" rel="noopener noreferrer" target="_blank">Link</a></p><p><br></p><h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>Normal</p>`,
    commentCount: faker.number.int(numberRange),
    likeCount: faker.number.int(numberRange),
    scrapCount: faker.number.int(numberRange),
    createdAt: faker.date.past().toISOString(),
    mine: booleanValue,
    liked: !booleanValue,
    modified: booleanValue,
    scraped: booleanValue,
    images: createMockImages(imageUrls),
    postId: id,
    anonymity: booleanValue,
    author: userInfo.certifiedSsafyUserInfo,
    category: articleCategories[id % 5],
  };
};

export const articles: ArticleDetail[] = Array(5)
  .fill(undefined)
  .map((_, index) => createMockArticle(index));

// TODO: 없는 article 요청시 응답할 데이터로 바꾸기
export const articleFallback = createMockArticle(100);

export const articleError: ArticleDetailError = {
  error: {
    isUnknownError: false,
    message: '삭제된 게시글입니다.',
  },
};

export const createMockArticleSummary = (id: number): ArticleSummary => {
  const anonymity = Boolean(id % 2);
  const numberRange = { min: 1000, max: 100000 };
  return {
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
