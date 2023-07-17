export const routes = {
  root: () => '/',
  main: () => '/main',

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
    edit: {
      // ssafy info
      nickname: () => `${routes.profile.self()}/nickname/edit`,
      year: () => `${routes.profile.self()}/year/edit`,
      campus: () => `${routes.profile.self()}/campus/edit`,
      isMajor: () => `${routes.profile.self()}/isMajor/edit`,
      track: () => `${routes.profile.self()}/track/edit`,

      portfolio: () => `${routes.profile.self()}/portfolio/edit`,
    },
    myInfoSettings: () => `${routes.profile.self()}/myinfo-settings`,
  },

  //
  unauthorized: () => '/unauthorized',
};
