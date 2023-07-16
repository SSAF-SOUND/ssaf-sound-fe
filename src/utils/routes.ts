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
    detail: (id: number) => `/profile/${id}`,
    edit: {
      portfolio: () => '/profile/portfolio/edit',
    },
    myInfoSettings: () => '/profile/myinfo-settings',
  },

  //
  unauthorized: () => '/unauthorized',
};
