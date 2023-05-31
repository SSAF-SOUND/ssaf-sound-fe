export const queryKeys = {
  todos: (id: string) => ['todos', { id }],
};

export const endpoints = {
  auth: {
    signIn: () => '/login',
  },
};
