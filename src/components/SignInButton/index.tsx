import { Icon } from '~/components/Common/Icon';

import Base from './Base';

const iconSize = 24;
const SignInButton = {
  Google: () => (
    <Base
      icon={<Icon name="google" size={iconSize} />}
      provider="google"
      text="Google 로그인"
    />
  ),
  GitHub: () => (
    <Base
      icon={<Icon name="github" size={iconSize} />}
      provider="github"
      text="GitHub 로그인"
    />
  ),
  Kakao: () => (
    <Base
      icon={<Icon name="kakao" size={iconSize} />}
      provider="kakao"
      text="Kakao 로그인"
    />
  ),
  Apple: () => (
    <Base
      icon={<Icon name="apple" size={iconSize} />}
      provider="apple"
      text="Apple 로그인"
    />
  ),
};

export default SignInButton;
