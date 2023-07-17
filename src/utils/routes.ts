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

  //
  unauthorized: () => '/unauthorized',
};
