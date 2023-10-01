import type { LunchDateSpecifier } from '~/services/lunch';
import type {
  RecruitSummariesQueryStringObject,
  MatchStatus,
  RecruitCategoryName,
} from '~/services/recruit';
import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

import {
  defaultRecruitsPageCursor,
  defaultRecruitsPageSize,
} from '~/services/recruit/apis/constants';

type JoinedRecruitsParams = { memberId: number } & Partial<
  Pick<RecruitSummariesQueryStringObject, 'category' | 'cursor' | 'size'>
>;

type AppliedRecruitsParams = Partial<
  { matchStatus: MatchStatus } & Pick<
    RecruitSummariesQueryStringObject,
    'category' | 'cursor' | 'size'
  >
>;

type MyScrapedRecruitsParams = Partial<{
  category: RecruitCategoryName;
  cursor: number | null;
  size: number;
}>;

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
    myScraped: (params: Pick<MyScrapedRecruitsParams, 'category'> = {}) => [
      ...queryKeys.auth(),
      'my-scraped-recruits',
      params,
    ],
    list: (params: RecruitsListPageRouteQuery = {}) => {
      const { category, keyword, recruitParts, skills, includeCompleted } =
        params;

      return [
        ...queryKeys.recruit.self(),
        {
          category,
          keyword,
          recruitParts,
          skills,
          includeCompleted,
        },
      ];
    },
    joinedList: (params: Omit<JoinedRecruitsParams, 'cursor' | 'size'>) => {
      return [...queryKeys.recruit.self(), 'joined', params];
    },
    appliedList: {
      self: () => [...queryKeys.recruit.self(), 'applied'],
      filter: (params: Omit<AppliedRecruitsParams, 'cursor' | 'size'>) => [
        ...queryKeys.recruit.appliedList.self(),
        params,
      ],
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
    list: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword ? ('/posts/search' as const) : ('/posts' as const);
    },
    hot: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword ? ('/posts/hot/search' as const) : ('/posts/hot' as const);
    },
    mine: () => '/posts/my' as const,
    myScraped: () => '/posts/my-scrap' as const,

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
      recruitApplicationId,
    }: {
      recruitId: number;
      recruitApplicationId: number;
    }) =>
      `${endpoints.recruit.detail(recruitId)}/${recruitApplicationId}` as const,
    myScraped: (params: MyScrapedRecruitsParams = {}) => {
      const {
        size = defaultRecruitsPageSize,
        cursor = defaultRecruitsPageCursor,
      } = params;
      const searchParams = new URLSearchParams();
      const queryStringObject = { size, cursor };
      Object.entries(queryStringObject).forEach(([key, value]) => {
        if (value) searchParams.append(key, String(value));
      });
      const queryString = searchParams.toString();
      return `/recruits/my-scrap?${queryString}` as const;
    },
    scrap: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/scrap` as const,
    complete: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/expired` as const,
    list: () => endpoints.recruit.self(),
    joinedList: (params: JoinedRecruitsParams) => {
      const {
        category,
        memberId,
        cursor = defaultRecruitsPageCursor,
        size = defaultRecruitsPageSize,
      } = params;
      const searchParams = new URLSearchParams();

      const joinedRecruitsQueryStringObject = {
        category,
        memberId,
        cursor,
        size,
      };
      Object.entries(joinedRecruitsQueryStringObject).map(([key, value]) => {
        if (value) searchParams.append(key, String(value));
      });
      const queryString = searchParams.toString();

      return `${endpoints.recruit.self()}/joined?${queryString}` as const;
    },
    appliedList: (params: AppliedRecruitsParams) => {
      const searchParams = new URLSearchParams();
      const {
        category,
        cursor = defaultRecruitsPageCursor,
        size = defaultRecruitsPageSize,
        matchStatus,
      } = params;

      const appliedRecruitsQueryStringObject = {
        category,
        cursor,
        size,
        matchStatus,
      };

      Object.entries(appliedRecruitsQueryStringObject).forEach(
        ([key, value]) => {
          if (value) searchParams.append(key, String(value));
        }
      );
      const queryString = searchParams.toString();
      return `${endpoints.recruit.self()}/applied?${queryString}` as const;
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
      const { recruitId } = params;
      return `/recruits/${recruitId}/comments` as const;
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
