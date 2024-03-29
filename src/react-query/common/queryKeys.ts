import type { LunchDateSpecifier } from '~/services/lunch';
import type {
  RecruitSummariesQueryStringObject,
  MatchStatus,
  RecruitCategoryName,
} from '~/services/recruit';
import type { RecruitsListPageRouteQuery } from '~/utils/client-routes/recruit';

type JoinedRecruitsParams = { memberId: number } & Partial<
  Pick<
    RecruitSummariesQueryStringObject,
    'category' | 'cursor' | 'size' | 'page'
  >
>;

type AppliedRecruitsParams = Partial<
  { matchStatus: MatchStatus } & Pick<
    RecruitSummariesQueryStringObject,
    'category' | 'cursor' | 'size' | 'page'
  >
>;

type MyScrapedRecruitsParams = Partial<{
  category: RecruitCategoryName;
  cursor: number | null;
  size: number;
  page: number;
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
    termsOfService: () => [...queryKeys.meta.self(), 'termsOfService'],
  },
  articles: {
    categories: () => ['articles', 'categories'],
    allListBase: () => ['articles', 'all'],
    allListByOffset: ({
      searchKeyword,
      page,
    }: {
      searchKeyword?: string;
      page: number;
    }) => [
      ...queryKeys.articles.allListBase(),
      'offset',
      searchKeyword || null,
      page,
    ],
    listBase: () => ['articles', 'category'],
    listByCursor: (categoryId: number, searchKeyword?: string) => [
      ...queryKeys.articles.listBase(),
      categoryId,
      'cursor',
      searchKeyword || null,
    ],
    listByOffset: ({
      categoryId,
      searchKeyword,
      page,
    }: {
      categoryId: number;
      searchKeyword?: string;
      page: number;
    }) => [
      ...queryKeys.articles.listBase(),
      categoryId,
      'offset',
      searchKeyword || null,
      page,
    ],
    hotBase: () => ['articles', 'hot'],
    hotByCursor: (searchKeyword?: string) => [
      ...queryKeys.articles.hotBase(),
      'cursor',
      searchKeyword || null,
    ],
    hotByOffset: ({
      searchKeyword,
      page,
    }: {
      searchKeyword?: string;
      page: number;
    }) => [
      ...queryKeys.articles.hotBase(),
      'offset',
      searchKeyword || null,
      page,
    ],
    detail: (articleId: number) => ['articles', articleId],
    mineBase: () => [...queryKeys.auth(), 'my-articles'],
    mineByCursor: () => [...queryKeys.articles.mineBase(), 'cursor'],
    mineByOffset: ({ page }: { page: number }) => [
      ...queryKeys.articles.mineBase(),
      'offset',
      page,
    ],
    myScrapsBase: () => [...queryKeys.auth(), 'my-scraped-articles'],
    myScrapsByCursor: () => [...queryKeys.articles.myScrapsBase(), 'cursor'],
    myScrapsByOffset: ({ page }: { page: number }) => [
      ...queryKeys.articles.myScrapsBase(),
      'offset',
      page,
    ],
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
    listBase: () => [...queryKeys.recruit.self()],
    listByCursor: (params: Omit<RecruitsListPageRouteQuery, 'page'> = {}) => [
      ...queryKeys.recruit.listBase(),
      'cursor',
      params,
    ],
    listByOffset: (params: RecruitsListPageRouteQuery = {}) => [
      ...queryKeys.recruit.listBase(),
      'offset',
      params,
    ],
    joinedListBase: () => [
      ...queryKeys.auth(),
      ...queryKeys.recruit.self(),
      'joined',
    ],
    joinedListByCursor: (
      params: Omit<JoinedRecruitsParams, 'cursor' | 'size' | 'page'>
    ) => [...queryKeys.recruit.joinedListBase(), 'cursor', params],
    joinedListByOffset: (
      params: Omit<JoinedRecruitsParams, 'cursor' | 'size'>
    ) => [...queryKeys.recruit.joinedListBase(), 'offset', params],

    appliedListBase: () => [
      ...queryKeys.auth(),
      ...queryKeys.recruit.self(),
      'applied',
    ],
    appliedListByCursor: {
      self: () => [...queryKeys.recruit.appliedListBase(), 'cursor'],
      filter: (
        params: Omit<AppliedRecruitsParams, 'cursor' | 'size' | 'page'>
      ) => [...queryKeys.recruit.appliedListByCursor.self(), params],
    },
    appliedListByOffset: {
      self: () => [...queryKeys.recruit.appliedListBase(), 'offset'],
      filter: (params: Omit<AppliedRecruitsParams, 'cursor' | 'size'>) => [
        ...queryKeys.recruit.appliedListByOffset.self(),
        params,
      ],
    },

    myScrapsBase: () => [...queryKeys.auth(), 'my-scraped-recruits'],
    myScrapsByCursor: (
      params: Pick<MyScrapedRecruitsParams, 'category'> = {}
    ) => [...queryKeys.recruit.myScrapsBase(), 'cursor', params],
    myScrapsByOffset: (
      params: Pick<MyScrapedRecruitsParams, 'page' | 'category'>
    ) => [...queryKeys.recruit.myScrapsBase(), 'offset', params],

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
  notification: {
    self: () => [...queryKeys.auth(), 'notification'],
    hasNew: () => [...queryKeys.notification.self(), 'hasNew'],
    listByCursor: () => [...queryKeys.notification.self(), 'cursor'],
    listByOffset: ({ page }: { page: number }) => [
      ...queryKeys.notification.self(),
      'offset',
      page,
    ],
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
    allListByOffset: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword
        ? ('/posts/all/search/offset' as const)
        : ('/posts/all/offset' as const);
    },
    listByCursor: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword
        ? ('/posts/search/cursor' as const)
        : ('/posts/cursor' as const);
    },
    listByOffset: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword
        ? ('/posts/search/offset' as const)
        : ('/posts/offset' as const);
    },
    hotByCursor: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword
        ? ('/posts/hot/search/cursor' as const)
        : ('/posts/hot/cursor' as const);
    },
    hotByOffset: (params: { keyword?: string } = {}) => {
      const { keyword } = params;
      return keyword
        ? ('/posts/hot/search/offset' as const)
        : ('/posts/hot/offset' as const);
    },
    mineByCursor: () => '/posts/my/cursor' as const,
    mineByOffset: () => '/posts/my/offset' as const,
    myScrapsByCursor: () => '/posts/my-scrap/cursor' as const,
    myScrapsByOffset: () => '/posts/my-scrap/offset' as const,
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
    scrap: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/scrap` as const,
    complete: (recruitId: number) =>
      `${endpoints.recruit.detail(recruitId)}/expired` as const,
    listByCursor: () => `${endpoints.recruit.self()}/cursor` as const,
    listByOffset: () => `${endpoints.recruit.self()}/offset` as const,
    joinedListByCursor: () =>
      `${endpoints.recruit.self()}/joined/cursor` as const,
    joinedListByOffset: () =>
      `${endpoints.recruit.self()}/joined/offset` as const,
    appliedListByCursor: () =>
      `${endpoints.recruit.self()}/applied/cursor` as const,
    appliedListByOffset: () =>
      `${endpoints.recruit.self()}/applied/offset` as const,
    myScrapsByCursor: () => `/recruits/my-scrap/cursor` as const,
    myScrapsByOffset: () => `/recruits/my-scrap/offset` as const,

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
    termsOfService: () => '/terms' as const,
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
  notification: {
    self: () => '/notifications' as const,
    hasNew: () => `${endpoints.notification.self()}/new` as const,
    listByCursor: () => `${endpoints.notification.self()}/cursor` as const,
    listByOffset: () => `${endpoints.notification.self()}/offset` as const,
  },
};
