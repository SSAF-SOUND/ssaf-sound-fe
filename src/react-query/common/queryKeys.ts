export const queryKeys = {
  auth: () => ['auth'],
  user: {
    myInfo: () => [...queryKeys.auth(), 'myInfo'],
    myPortfolio: () => [...queryKeys.auth(), 'portfolio'],
    portfolio: (id: number) => ['portfolio', id],
    profileVisibility: () => ['profileVisibility'],
  },
  meta: {
    self: () => ['meta'],
    campuses: () => [...queryKeys.meta.self(), 'campuses'],
  },
  article: {
    categories: () => ['article', 'categories'],
    list: (categoryId: number) => ['article', 'category', categoryId],
    detail: (articleId: number) => ['article', articleId],
    search: () => [],
    hot: () => [],
    mine: () => [],
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
    preSignedUrl: () => `/store/image`,
  },
  articles: {
    categories: () => '/boards',
    list: (params: { categoryId: number; cursor: number; size: number }) => {
      const { categoryId: boardId, size, cursor } = params;

      // https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568
      const queryString = new URLSearchParams({
        boardId,
        size,
        cursor,
      } as never).toString();

      return `/posts?${queryString}`;
    },
    create: (categoryId: number) => `/posts?boardId=${categoryId}`,
    detail: (articleId: number) => `/posts/${articleId}`,
    report: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/report`,
    like: (articleId: number) => `${endpoints.articles.detail(articleId)}/like`,
    scrap: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/scrap`,
  },
  user: {
    myInfo: () => '/members' as const,
    studentCertification: () => '/members/ssafy-certification' as const,

    myPortfolio: () => `/members/portfolio`,
    portfolio: (id: number) => `/members/${id}/portfolio` as const,

    ssafyBasicInfo: () => '/members/default-information' as const,
    nickname: () => '/members/nickname' as const,
    isMajor: () => '/members/major' as const,
    track: () => '/members/major-track' as const,
    profileVisibility: () => '/members/profile-public' as const,
  },
  recruit: {
    // todo 이름, 파라미터 수정
    data: () => '/recruits' as const,
    members: (recruitId: string) => `/recruits/${recruitId}/members` as const,
    detail: (recruitId: string) => `/recruits/${recruitId}/detail` as const,
  },
  meta: {
    campuses: () => '/meta/campuses' as const,
    skills: () => '/meta/skills' as const,
  },
};
