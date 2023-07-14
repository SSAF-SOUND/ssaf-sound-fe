import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import SignInPage from '~/pages/auth/sign-in';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof SignInPage> = {
  title: 'Page/SignIn',
  component: SignInPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        // eslint-disable-next-line
        // @ts-ignore
        setMyInfo(null);
        // - `undefined`가 직렬화 불가능한 데이터라서 그런지, 아예 update 시도 자체를 안 합니다.
        // - `removeQueries`나 `resetQueries`는 스토리 전환시, 다른 스토리에서도 `reset`이 트리거되는 버그가 있어서 사용할 수 없어요.
        // - 여기선 `undefined`대신 `null`을 세팅했지만, `null`은 디폴트 값 할당을 트리거하지 않기 때문에, 디폴트 값 할당을 의도한 경우엔 사용하면 안됩니다.
      }, [setMyInfo]);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: {
        member: [],
      },
    },
  },
};

export default meta;

type SignInPageStory = StoryObj<typeof SignInPage>;

export const Default: SignInPageStory = {};
