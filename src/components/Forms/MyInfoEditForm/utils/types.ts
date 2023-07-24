import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';

export interface MyInfoEditFormValues
  extends Pick<UserRegisterFormValues, 'nickname'> {
  ssafyBasicInfo: {
    ssafyMember: boolean;
    year: number;
    campus: string;
  };
  isMajor: boolean;
  track: string;
}
