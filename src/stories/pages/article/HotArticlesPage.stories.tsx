import type { Meta, StoryObj } from '@storybook/react';

import { getHotArticlesError } from '~/mocks/handlers';
import HotArticlesPage from '~/pages/hot-articles';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof HotArticlesPage> = {
  title: 'Page/Article/Hot',
  component: HotArticlesPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type HotArticlesPageStory = StoryObj<typeof HotArticlesPage>;

export const Default: HotArticlesPageStory = {};

export const InfiniteScrollError: HotArticlesPageStory = {
  parameters: {
    msw: {
      handlers: {
        article: [getHotArticlesError],
      },
    },
  },
};
