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
    mine: () => [...queryKeys.auth(), 'articles'],
  },
  articleComments: {
    list: (articleId: number) => ['comments', articleId],
  },
  recruitComments: {
    list: (recruitId: number) => ['recruit-comments', recruitId],
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
        return `/posts/search?${queryString}`;
      }

      const queryString = new URLSearchParams({
        boardId,
        size,
        cursor,
      } as never).toString();

      return `/posts?${queryString}`;
    },
    hot: (params: { cursor: number; size: number; keyword?: string }) => {
      const { size, cursor, keyword = '' } = params;

      if (keyword) {
        const queryString = new URLSearchParams({
          size,
          cursor,
          keyword,
        } as never).toString();
        return `/posts/hot/search?${queryString}`;
      }

      const queryString = new URLSearchParams({
        size,
        cursor,
      } as never).toString();

      return `/posts/hot?${queryString}`;
    },
    mine: (params: { cursor: number; size: number }) => {
      const queryString = new URLSearchParams(params as never).toString();
      return `/posts/my?${queryString}`;
    },
    create: (categoryId: number) => `/posts?boardId=${categoryId}`,
    detail: (articleId: number) => `/posts/${articleId}`,
    report: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/report`,
    like: (articleId: number) => `${endpoints.articles.detail(articleId)}/like`,
    scrap: (articleId: number) =>
      `${endpoints.articles.detail(articleId)}/scrap`,
  },
  articleComments: {
    detail: (commentId: number) => `/comments/${commentId}`,
    list: (articleId: number) => `/comments?postId=${articleId}`,
    create: (articleId: number) => `/comments?postId=${articleId}`,
    like: (commentId: number) =>
      `${endpoints.articleComments.detail(commentId)}/like`,
    report: (commentId: number) =>
      `${endpoints.articleComments.detail(commentId)}/report`,
    reply: (params: { articleId: number; commentId: number }) => {
      const { commentId, articleId } = params;
      const queryString = new URLSearchParams({
        commentId,
        postId: articleId,
      } as never).toString();
      return `/comments/reply?${queryString}`;
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
    profileVisibility: () => '/members/profile-public' as const,
    userProfileVisibility: (id: number) =>
      `/members/${id}/profile-public` as const,
  },
  recruit: {
    // todo 이름, 파라미터 수정
    data: () => '/recruits' as const,
    members: (recruitId: string) => `/recruits/${recruitId}/members` as const,
    detail: (recruitId: string) => `/recruits/${recruitId}/detail` as const,
  },
  recruitComments: {
    list: (recruitId: number) => `/recruits/${recruitId}/comments` as const,
    create: (recruitId: number) => `/recruits/${recruitId}/comments` as const,
    detail: (commentId: number) => `/recruit-comments/${commentId}` as const, // 삭제, 수정
    like: (commentId: number) =>
      `${endpoints.recruitComments.detail(commentId)}/like` as const,
    report: (commentId: number) =>
      `${endpoints.recruitComments.detail(commentId)}/report` as const,
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
  },
};
