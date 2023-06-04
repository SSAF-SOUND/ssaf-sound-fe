import { AiFillApple, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { providers } from '~/utils';

import Base from './Base';

const SignInButton = {
  Google: () => (
    <Base
      icon={<FcGoogle size={30} />}
      providerName="Google"
      backgroundColor={providers.google.backgroundColor}
      textColor={providers.google.textColor}
      signInUrl={providers.google.signInUrl}
    />
  ),
  GitHub: () => (
    <Base
      icon={<AiFillGithub size={30} />}
      providerName="GitHub"
      backgroundColor={providers.github.backgroundColor}
      textColor={providers.github.textColor}
      signInUrl={providers.github.signInUrl}
    />
  ),
  Kakao: () => (
    <Base
      icon={<RiKakaoTalkFill size={30} />}
      providerName="Kakao"
      backgroundColor={providers.kakao.backgroundColor}
      textColor={providers.kakao.textColor}
      signInUrl={providers.kakao.signInUrl}
    />
  ),
  Apple: () => (
    <Base
      icon={<AiFillApple size={30} />}
      providerName="Apple"
      backgroundColor={providers.apple.backgroundColor}
      textColor={providers.apple.textColor}
      signInUrl={providers.apple.signInUrl}
    />
  ),
};

export default SignInButton;
