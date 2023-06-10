export const queryKeys = {
  todos: (id: string) => ['todos', { id }],
};

export const endpoints = {
  auth: {
    signIn: () => '/auth/login' as const,
    signOut: () => '/auth/logout' as const,
    refresh: () => '/auth/reissue' as const,
  },
};
