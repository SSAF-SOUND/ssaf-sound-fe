import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetArticlesApiData } from '~/services/article';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getArticleCategories, getArticlesError } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import ArticleCategoryPage from '~/pages/articles/categories/[categoryId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleCategoryPage> = {
  title: 'Page/Article/Category',
  component: ArticleCategoryPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.removeQueries(queryKeys.articles.list(successCaseCategoryId));
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type ArticleCategoryPageStory = StoryObj<typeof ArticleCategoryPage>;

const successCaseCategoryId = 1;

export const SignedIn: ArticleCategoryPageStory = {
  args: {
    categoryId: successCaseCategoryId,
  },
};

export const NotSignedIn: ArticleCategoryPageStory = {
  args: {
    categoryId: successCaseCategoryId,
  },
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMyInfo(null);
      return <Story />;
    },
  ],
};

const errorCaseCategoryId = 2;
export const FetchError: ArticleCategoryPageStory = {
  args: {
    categoryId: errorCaseCategoryId,
  },
  parameters: {
    msw: {
      handlers: {
        article: [getArticlesError, getArticleCategories],
      },
    },
  },
};

const notExistCaseCategoryId = 3;
const notExistData: InfiniteData<GetArticlesApiData['data']> = {
  pages: [
    {
      posts: [],
      cursor: null,
    },
  ],
  pageParams: [null],
};

export const NotExist: ArticleCategoryPageStory = {
  args: {
    categoryId: notExistCaseCategoryId,
  },
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const queryKey = queryKeys.articles.list(notExistCaseCategoryId);
      queryClient.setQueryData(queryKey, notExistData);

      return <Story />;
    },
  ],
};

/**
 * 검색 결과가 없는 스토리(NoSearchResultsStory)는 작성하지 않음
 * 검색어는 `query parameters`기반으로 동작하는데, 관련 애드온인 `@storybook/addon-queryparams`가 최신 스토리북 버전과 호환되지 않음
 */
