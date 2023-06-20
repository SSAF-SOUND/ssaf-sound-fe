const createWebStorage = () => {
  const AUTH_PROVIDER_KEY = 'auth-provider';

  return {
    setAuthProvider: (provider: string) => {
      sessionStorage.setItem(AUTH_PROVIDER_KEY, provider);
    },
    getAuthProvider: () => {
      return sessionStorage.getItem(AUTH_PROVIDER_KEY);
    },
  };
};

export const webStorage = createWebStorage();
