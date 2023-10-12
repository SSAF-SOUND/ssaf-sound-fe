import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetMyPortfolio,
  mockGetMyPortfolioError,
} from '~/mocks/handlers/member/apis/mockGetMyPortfolio';
import { mockUpdateMyPortfolio } from '~/mocks/handlers/member/apis/mockUpdateMyPortfolio';
import PortfolioEditPage from '~/pages/profile/portfolio/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof PortfolioEditPage> = {
  title: 'Page/프로필/포트폴리오 수정',
  component: PortfolioEditPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ...createMswParameters({
      common: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export default meta;

type PortfolioEditPageStory = StoryObj<typeof PortfolioEditPage>;

export const Success: PortfolioEditPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [mockUpdateMyPortfolio, mockGetMyPortfolio],
    }),
  },
};

export const Failure: PortfolioEditPageStory = {
  name: '로딩 에러',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyPortfolioError],
    }),
  },
};
