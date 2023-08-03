import type { Meta } from '@storybook/react';
import type { FC } from 'react';
import type { ArticleSummary } from '~/services/article';

import { createMockArticleSummary } from '~/mocks/handlers/article/data';
import { PageLayout } from '~/stories/Layout';

import { ArticleCard, HotArticleCard } from './index';

const meta: Meta<typeof ArticleCard> = {
  title: 'Article/ArticleCard',
  component: ArticleCard,
  decorators: [
    (Story) => (
      <PageLayout css={{ paddingTop: 20 }}>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

const mockArticleSummary = createMockArticleSummary(2);

interface Args {
  title: string;
  content: string;
  nickname: string;
}

const defaultArgs: Args = {
  title: 'Title '.repeat(10),
  content: 'Content '.repeat(10),
  nickname: 'Nickname',
};

const Render = (Component: FC<{ article: ArticleSummary }>) =>
  function StoryComponent(args: Args) {
    const { title, content, nickname } = args;
    const copiedArticleSummary = { ...mockArticleSummary };
    if (title) copiedArticleSummary.title = title;
    if (content) copiedArticleSummary.content = content;
    if (nickname) copiedArticleSummary.nickname = nickname.slice(0, 11);
    return <Component article={copiedArticleSummary} />;
  };

export const Normal = {
  args: defaultArgs,
  render: Render(ArticleCard),
};

export const Hot = {
  args: defaultArgs,
  render: Render(HotArticleCard),
};
