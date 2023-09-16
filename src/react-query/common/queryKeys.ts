import type { LunchDateSpecifier } from '~/services/lunch';
import type {
  RecruitSummariesQueryStringObject,
  RecruitSummariesQueryStringObjectWithoutInfiniteParams,
} from '~/services/recruit';

import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit';

export const queryKeys = {
  auth: () => ['auth'],
  user: {
    myInfo: () => [...queryKeys.auth(), 'myInfo'],
    userInfo: (id: number) => ['userInfo', id],
    myPortfolio: () => [...queryKeys.auth(), 'portfolio'],
    portfolio: (id: number) => ['portfolio', id],
    profileVisibility: () => ['profileVisibility', 'mine'],
    userProfileVisibility: (id: number) => ['profileVisibility', id],
  },
  meta: {
    self: () => ['meta'],
    campuses: () => [...queryKeys.meta.self(), 'campuses'],
    recruitTypes: () => [...queryKeys.meta.self(), 'recruitTypes'],
  },
  articles: {
    categories: () => ['articles', 'categories'],
    list: (categoryId: number, searchKeyword?: string) => [
      'articles',
      'category',
      categoryId,
      searchKeyword ?? null,
    ],
    hot: (searchKeyword?: string) => ['articles', 'hot', searchKeyword ?? null],
    detail: (articleId: number) => ['articles', articleId],
    mine: () => [...queryKeys.auth(), 'my-articles'],
    myScraped: () => [...queryKeys.auth(), 'my-scraped-articles'],
  },
  articleComments: {
    list: (articleId: number) => ['comments', articleId],
  },
  recruitComments: {
    list: (recruitId: number) => ['recruit-comments', recruitId],
  },
  recruit: {
    self: () => ['recruits'],
    detail: (recruitId: number) => [
      ...queryKeys.auth(),
      ...queryKeys.recruit.self(),
      recruitId,
    ],
    participants: (recruitId: number) => [
      ...queryKeys.recruit.detail(recruitId),
      'participants',
    ],
    list: (
      params: Partial<RecruitSummariesQueryStringObjectWithoutInfiniteParams>
    ) => {
      const { category, keyword, recruitParts, skills, completed } = params;

      return [
        ...queryKeys.recruit.self(),
        {
          category,
          keyword,
          recruitParts,
          skills,
          completed,
        },
      ];
    },
    application: {
      self: (recruitId: number) => [
        ...queryKeys.recruit.detail(recruitId),
        'application',
      ],
      applicants: (recruitId: number) => [
        ...queryKeys.recruit.application.self(recruitId),
        'applicants',
      ],
      rejectedApplicants: (recruitId: number) => [
        ...queryKeys.recruit.application.applicants(recruitId),
        'rejected',
      ],
      mine: (recruitId: number) => [
        ...queryKeys.recruit.application.self(recruitId),
        'mine',
      ],
      detail: ({
        recruitId,
        recruitApplicationId,
      }: {
        recruitId: number;
        recruitApplicationId: number;
      }) => [
        ...queryKeys.recruit.application.self(recruitId),
        recruitApplicationId,
      ],
    },
  },
  lunch: {
    self: () => [...queryKeys.auth(), 'lunch'],
    list: ({
      campus,
      dateSpecifier,
    }: {
      campus: string;
      dateSpecifier: LunchDateSpecifier;
    }) => [...queryKeys.lunch.self(), campus, dateSpecifier],
  },
};

export const endpoints = {
  auth: {
    provider: (provider: string) => `/auth/${provider}` as const,
    signIn: () => '/auth/callback' as const,
    signOut: () => '/auth/logout' as const,
    refresh: () => '/auth/reissue' as const,
  },
  s3: {
    preSignedUrl: () => `/store/image` as const,
  },
  articles: {
    categories: () => '/boards' as const,
    list: (params: {
      categoryId: number;
      cursor: number;
      size: number;
      keyword?: string;
    }) => {
      const { categoryId: boardId, size, cursor, keyword = '' } = params;

      if (keyword) {
        // https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568
        const queryString = new URLSearchParams({
          boardId,
          size,
          cursor,
          keyword,
        } as never).toString();
        return `/posts/search?${queryString}` as const;
      }

      const queryString = new URLSearchParams({
        boardId,
        size,
        cursor,
      } as never).toString();

      return `/posts?${queryString}` as const;
    },
    hot: (params: { cursor: number; size: number; keyword?: string }) => {
      const { size, cursor, keyword = '' } = params;

      if (keyword) {
        const queryString = new URLSearchParams({
          size,
          cursor,
          keyword,
        } as never).toString();
        return `/posts/hot/search?${queryString}` as const;
      }

      const queryString = new URLSearchParams({
        size,
        cursor,
      } as never).toString();

      return `/posts/hot?${queryString}` as const;
    },
    mine: (params: { cursor: number; size: number }) => {
      const queryString = new URLSearchParams(params as never).toString();
      return `/posts/my?${queryString}` as const;
    },
    myScraped: (params: { cursor: number; size: number }) => {
      const queryString = new URLSearchParams(params as never).toString();
      return `/posts/my-scrap?${queryString}`;
    },
    create: (categoryId: number) => `/posts?boardId=${categoryId}` as const,
    detail: (articleId: number) => `/posts/${articleId}` as const,
    like: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/like` as const,
    scrap: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/scrap` as const,
  },
  articleComments: {
    detail: (commentId: number) => `/comments/${commentId}` as const,
    list: (articleId: number) => `/comments?postId=${articleId}` as const,
    create: (articleId: number) => `/comments?postId=${articleId}` as const,
    like: (commentId: number) =>
      `${endpoints.articleComments.detail(commentId)}/like` as const,
    reply: (params: { articleId: number; commentId: number }) => {
      const { commentId, articleId } = params;
      const queryString = new URLSearchParams({
        commentId,
        postId: articleId,
      } as never).toString();
      return `/comments/reply?${queryString}` as const;
    },
  },
  user: {
    myInfo: () => '/members' as const,
    userInfo: (id: number) => `/members/${id}/default-information` as const,
    studentCertification: () => '/members/ssafy-certification' as const,

    myPortfolio: () => `/members/portfolio` as const,
    portfolio: (id: number) => `/members/${id}/portfolio` as const,

    ssafyBasicInfo: () => '/members/default-information' as const,
    nickname: () => '/members/nickname' as const,
    isMajor: () => '/members/major' as const,
    track: () => '/members/major-track' as const,
    profileVisibility: () => '/members/public-profile' as const,
    userProfileVisibility: (id: number) =>
      `/members/${id}/public-profile` as const,
  },
  recruit: {
    self: () => `/recruits` as const,
    detail: (recruitId: number) =>
      `${endpoints.recruit.self()}/${recruitId}` as const,
    participants: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/members` as const,
    participant: ({
      recruitId,
      userId,
    }: {
      recruitId: number;
      userId: number;
    }) => `${endpoints.recruit.detail(recruitId)}/members/${userId}` as const,

    scrap: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/scrap` as const,
    complete: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/expired` as const,
    list: (params: Partial<RecruitSummariesQueryStringObject>) => {
      const {
        size = defaultRecruitsPageSize,
        cursor = defaultRecruitsPageCursor,
        category,
        completed = false,
        recruitParts = [],
        skills = [],
        keyword,
      } = params;

      const queryStringObject = new URLSearchParams({
        size: size,
        isFinished: completed,
      } as never);

      if (category) queryStringObject.append('category', category);
      if (cursor) queryStringObject.append('cursor', String(cursor));
      if (keyword) queryStringObject.append('keyword', keyword);

      recruitParts.forEach((part) => {
        queryStringObject.append('recruitTypes', part);
      });
      skills.forEach((skill) => queryStringObject.append('skills', skill));
      const queryString = queryStringObject.toString();

      return `${endpoints.recruit.self()}?${queryString}`;
    },
    apply: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/application` as const,
    application: {
      self: () => `/recruit-applications`,
      mine: (recruitId: number) =>
        `${endpoints.recruit.application.self()}/mine?recruitId=${recruitId}` as const,
      detail: (recruitApplicationId: number) =>
        `${endpoints.recruit.application.self()}/${recruitApplicationId}` as const,
      applicants: (recruitId: number) =>
        `${endpoints.recruit.application.self()}?recruitId=${recruitId}` as const,
      rejectedApplicants: (recruitId: number) =>
        `${endpoints.recruit.application.self()}/rejected?recruitId=${recruitId}` as const,
      like: (recruitApplicationId: number) =>
        `${endpoints.recruit.application.detail(
          recruitApplicationId
        )}/like` as const,
      cancel: (recruitApplicationId: number) =>
        `${endpoints.recruit.application.detail(
          recruitApplicationId
        )}/cancel` as const,
      approve: (recruitApplicationId: number) =>
        `${endpoints.recruit.application.detail(
          recruitApplicationId
        )}/approve` as const,
      reject: (recruitApplicationId: number) =>
        `${endpoints.recruit.application.detail(
          recruitApplicationId
        )}/reject` as const,
    },
  },
  recruitComments: {
    list: (recruitId: number) => `/recruits/${recruitId}/comments` as const,
    create: (recruitId: number) => `/recruits/${recruitId}/comments` as const,
    detail: (commentId: number) => `/recruit-comments/${commentId}` as const, // 삭제, 수정
    like: (commentId: number) =>
      `${endpoints.recruitComments.detail(commentId)}/like` as const,
    reply: (params: { recruitId: number; commentId: number }) => {
      const { recruitId, commentId } = params;
      const queryString = new URLSearchParams({
        recruitId,
        commentId,
      } as never).toString();
      return `/recruit-comments/reply?${queryString}` as const;
    },
  },
  meta: {
    campuses: () => '/meta/campuses' as const,
    skills: () => '/meta/skills' as const,
    recruitTypes: () => '/meta/recruit-types' as const,
  },
  lunch: {
    list: ({ campus, date }: { campus: string; date: string }) => {
      const queryString = new URLSearchParams({ campus, date }).toString();
      return `/lunch?${queryString}` as const;
    },
    vote: (lunchId: number) => `/lunch/poll/${lunchId}` as const,
    revertVote: (lunchId: number) => `/lunch/poll/revert/${lunchId}` as const,
    error: () => `/lunch/error` as const,
  },
  report: () => '/report' as const,
};
