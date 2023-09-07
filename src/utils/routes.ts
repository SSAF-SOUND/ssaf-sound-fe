export const routes = {
  root: () => '/',
  main: () => '/main',
  articles: {
    self: () => '/articles',
    categories: () => `${routes.articles.self()}/categories`,
    category: (categoryId: number, searchKeyword?: string) => {
      const queryString = searchKeyword ? `?keyword=${searchKeyword}` : '';
      return `${routes.articles.categories()}/${categoryId}${queryString}`;
    },
    hot: (searchKeyword?: string) => {
      const queryString = searchKeyword ? `?keyword=${searchKeyword}` : '';
      return `/hot-articles${queryString}`;
    },
    detail: (articleId: number) => `${routes.articles.self()}/${articleId}`,
    edit: (articleId: number) => `${routes.articles.detail(articleId)}/edit`,
    create: (categoryId: number) =>
      `${routes.articles.self()}/new?categoryId=${categoryId}`,
  },

  //
  signIn: () => '/auth/sign-in',
  userRegister: () => '/auth/register',

  //
  certification: {
    student: () => '/certification/student',
  },

  //
  intro: {
    studentCertification: () => '/intro/student-certification',
  },

  profile: {
    self: () => '/profile',
    detail: (id: number) => `${routes.profile.self()}/${id}`,

    myInfoSettings: () => `${routes.profile.self()}/myinfo-settings`,
    myArticles: () => `${routes.profile.self()}/my-articles`,
    myScraps: (
      category: PossibleMyScrapsCategories = PossibleMyScrapsCategories.ARTICLES
    ) => `${routes.profile.self()}/my-scraps?category=${category}`,

    edit: {
      myInfo: (field: EditableMyInfoFields) =>
        `${routes.profile.myInfoSettings()}/${field}/edit`,

      portfolio: () => `${routes.profile.self()}/portfolio/edit`,
    },

    delete: {
      account: () => `${routes.profile.myInfoSettings()}/account/delete`,
    },
  },

  //
  unauthorized: () => '/unauthorized',

  //
  recruit: {
    self: () => '/recruits',
    detail: (recruitId: number) => `${routes.recruit.self()}/${recruitId}`,
    apply: (recruitId: number) => `${routes.recruit.self()}/apply/${recruitId}`,
    applyRedirect: () => `${routes.recruit.self()}/apply/redirect`,
    new: () => `${routes.recruit.self()}/new`,
  },

  lunch: {
    self: () => '/lunch',
    detail: ({
      campus,
      dateSpecifier,
    }: {
      campus: string;
      dateSpecifier: string;
    }) => {
      const queryString = new URLSearchParams({
        campus,
        date: dateSpecifier,
      }).toString();

      return `${routes.lunch.self()}?${queryString}`;
    },
  },
};

export enum EditableMyInfoFields {
  SSAFY_BASIC_INFO = 'ssafy-basic-info', // 기수, 캠퍼스, 멤버여부(학생 인증시 못바꿈)
  NICKNAME = 'nickname',
  IS_MAJOR = 'is-major',
  TRACK = 'track', // 인증된 상태에서만 바꿀 수 있음
}

export enum PossibleMyScrapsCategories {
  ARTICLES = 'articles',
  RECRUITS = 'recruits',
}
