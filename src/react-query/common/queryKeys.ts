export const queryKeys = {
  todos: (id: string) => ['todos', { id }],
  user: {
    myInfo: () => ['myInfo'],
  },
};

export const endpoints = {
  auth: {
    signIn: () => '/auth/login' as const,
    signOut: () => '/auth/logout' as const,
    refresh: () => '/auth/reissue' as const,
  },
  user: {
    myInfo: () => '/members' as const,
    nickname: () => '/members/nickname' as const,
    studentCertification: () => '/members/ssafy-certification' as const,
  },
  recruit: {
    detail: () => '/recruit/detail' as const,
  },
};
