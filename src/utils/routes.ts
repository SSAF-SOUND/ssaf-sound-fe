import type { RecruitParts, SkillName } from '~/services/recruit';

import { RecruitCategoryName } from '~/services/recruit';

export const routes = {
  root: () => '/' as const,
  main: () => '/main' as const,
  articles: {
    self: () => '/articles' as const,
    categories: () => `${routes.articles.self()}/categories` as const,
    category: (categoryId: number, searchKeyword?: string) => {
      const queryString = searchKeyword ? `?keyword=${searchKeyword}` : '';
      return `${routes.articles.categories()}/${categoryId}${queryString}` as const;
    },
    hot: (searchKeyword?: string) => {
      const queryString = searchKeyword ? `?keyword=${searchKeyword}` : '';
      return `/hot-articles${queryString}` as const;
    },
    detail: (articleId: number) =>
      `${routes.articles.self()}/${articleId}` as const,
    edit: (articleId: number) =>
      `${routes.articles.detail(articleId)}/edit` as const,
    create: (categoryId: number) =>
      `${routes.articles.self()}/new?categoryId=${categoryId}` as const,
  },

  //
  signIn: () => '/auth/sign-in' as const,
  userRegister: () => '/auth/register' as const,

  //
  certification: {
    student: () => '/certification/student' as const,
  },

  //
  intro: {
    studentCertification: () => '/intro/student-certification' as const,
  },

  profile: {
    self: () => '/profile' as const,
    detail: (id: number) => `${routes.profile.self()}/${id}` as const,
    myInfoSettings: () => `${routes.profile.self()}/myinfo-settings` as const,
    myArticles: () => `${routes.profile.self()}/my-articles` as const,
    myScraps: (
      category: PossibleMyScrapsCategories = PossibleMyScrapsCategories.ARTICLES
    ) => `${routes.profile.self()}/my-scraps?category=${category}` as const,

    edit: {
      myInfo: (field: EditableMyInfoFields) =>
        `${routes.profile.myInfoSettings()}/${field}/edit` as const,

      portfolio: () => `${routes.profile.self()}/portfolio/edit` as const,
    },

    delete: {
      account: () =>
        `${routes.profile.myInfoSettings()}/account/delete` as const,
    },
  },

  //
  unauthorized: () => '/unauthorized' as const,

  //
  recruit: {
    self: () => '/recruits' as const,
    list: (
      options: Partial<RecruitsPageQueryStringObject> = {}
    ): { pathname: string; query: Partial<RecruitsPageQueryStringObject> } => {
      const {
        category = RecruitCategoryName.PROJECT,
        keyword = '',
        completed = false,
        recruitParts = [],
        skills = [],
      } = options;

      return {
        pathname: routes.recruit.self(),
        query: {
          category,
          keyword,
          completed: String(completed),
          recruitParts,
          skills,
        },
      };
    },
    detail: (recruitId: number) =>
      `${routes.recruit.self()}/${recruitId}` as const,
    applications: {
      self: (recruitId: number) =>
        `${routes.recruit.detail(recruitId)}/applications`,
      mine: (recruitId: number) =>
        `${routes.recruit.applications.self(recruitId)}/mine` as const,
      detail: ({
        recruitId,
        recruitApplicationId,
      }: RecruitApplicationRouteParams) =>
        `${routes.recruit.applications.self(
          recruitId
        )}/${recruitApplicationId}` as const,
      rejected: (recruitId: number) => {
        return `${routes.recruit.applications.self(recruitId)}/rejected`;
      },
    },
    apply: (recruitId: number) =>
      `${routes.recruit.detail(recruitId)}/apply` as const,
    create: (category?: RecruitCategoryName) => {
      const queryString = category
        ? `?${new URLSearchParams({
            category,
          }).toString()}`
        : '';

      return `${routes.recruit.self()}/new${queryString}` as const;
    },
    edit: (recruitId: number) =>
      `${routes.recruit.detail(recruitId)}/edit` as const,
  },

  lunch: {
    self: () => '/lunch' as const,
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

      return `${routes.lunch.self()}?${queryString}` as const;
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

export type RecruitsPageQueryStringObject = {
  category: RecruitCategoryName;
  completed: string;
  keyword: string;
  skills: SkillName | SkillName[];
  recruitParts: RecruitParts | RecruitParts[];
};

interface RecruitApplicationRouteParams {
  recruitId: number;
  recruitApplicationId: number;
}
