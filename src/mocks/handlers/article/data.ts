import type { ArticleCategory } from '~/services/article';

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

export const articles = [];
