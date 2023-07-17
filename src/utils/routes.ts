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

    myInfoSettings: () => `${routes.profile.self()}/myinfo-settings`,

    edit: {
      myInfo: (field: EditableMyInfoFields) =>
        `${routes.profile.myInfoSettings()}/edit?field=${field}`,

      portfolio: () => `${routes.profile.self()}/portfolio/edit`,
    },
  },

  //
  unauthorized: () => '/unauthorized',
};

export enum EditableMyInfoFields {
  SSAFY_MEMBER = 'ssafyMember',
  NICKNAME = 'nickname',
  YEAR = 'year',
  CAMPUS = 'campus',
  IS_MAJOR = 'isMajor',
  TRACK = 'track',
}
