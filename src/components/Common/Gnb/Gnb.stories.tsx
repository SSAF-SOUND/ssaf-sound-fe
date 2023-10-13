import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { createMswParameters } from '~/stories/utils';

import { Gnb } from './index';

const meta: Meta<typeof Gnb> = {
  title: 'Navigation/Gnb',
  component: Gnb,
};

export default meta;

type GnbStory = StoryObj<typeof Gnb>;

export const Default: GnbStory = {
  name: '로그인',
  parameters: {
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export const NotSignedIn: GnbStory = {
  name: '로그인 하지 않음',
  parameters: {
    ...createMswParameters({
      member: [],
    }),
  },
};
