import { useAutoSignIn, useCheckRegisterRequired } from '~/services/member';

const Background = () => {
  useAutoSignIn();
  useCheckRegisterRequired();

  return <></>;
};

export default Background;
