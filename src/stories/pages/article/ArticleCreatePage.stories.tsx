import type { Meta, StoryObj } from '@storybook/react';

import { mockCreateArticle } from '~/mocks/handlers/article/apis/mockCreateArticle';
import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import ArticleCreatePage from '~/pages/articles/new';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof ArticleCreatePage> = {
  title: 'Page/게시글/게시글 만들기',
  component: ArticleCreatePage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
      article: [mockCreateArticle, mockGetArticleCategories],
    }),
  },
};

export default meta;

type ArticleCreatePageStory = StoryObj<typeof ArticleCreatePage>;

export const Default: ArticleCreatePageStory = {};
