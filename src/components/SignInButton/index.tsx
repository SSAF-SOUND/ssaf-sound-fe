import { AiFillApple, AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Base from './Base';

const iconSize = 24;
const SignInButton = {
  Google: () => (
    <Base
      icon={<AiOutlineGoogle size={iconSize} />}
      provider="google"
      text="Google 로그인"
    />
  ),
  GitHub: () => (
    <Base
      icon={<AiFillGithub size={iconSize} />}
      provider="github"
      text="GitHub 로그인"
    />
  ),
  Kakao: () => (
    <Base
      icon={<RiKakaoTalkFill size={iconSize} />}
      provider="kakao"
      text="Kakao 로그인"
    />
  ),
  Apple: () => (
    <Base
      icon={<AiFillApple size={iconSize} />}
      provider="apple"
      text="Apple 로그인"
    />
  ),
};

export default SignInButton;
