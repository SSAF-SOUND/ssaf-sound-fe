export const queryKeys = {
  auth: () => ['auth'],
  user: {
    myInfo: () => [...queryKeys.auth(), 'myInfo'],
    portfolio: (id: number) => [...queryKeys.auth(), 'portfolio', id],
  },
  meta: {
    self: () => ['meta'],
    campuses: () => [...queryKeys.meta.self(), 'campuses'],
  },
};

export const endpoints = {
  auth: {
    provider: (provider: string) => `/auth/${provider}` as const,
    signIn: () => '/auth/callback' as const,
    signOut: () => '/auth/logout' as const,
    refresh: () => '/auth/reissue' as const,
  },
  user: {
    myInfo: () => '/members' as const,
    studentCertification: () => '/members/ssafy-certification' as const,
    portfolio: (id: number) => `/members/${id}/portfolio` as const,

    ssafyBasicInfo: () => '/members/default-information' as const,
    nickname: () => '/members/nickname' as const,
    isMajor: () => '/members/major' as const,
    track: () => '/members/major-track' as const,
    portfolioVisibility: () => '/members/portfolio-public' as const,
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
