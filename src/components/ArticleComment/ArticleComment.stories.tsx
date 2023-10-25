import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import {
  commentDetails,
  commentDetailWithDeletedAuthor,
} from '~/mocks/handlers/articleComment/data';
import { userInfo } from '~/mocks/handlers/member/data';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';
import { disableArgs } from '~/stories/utils';
import { flex } from '~/styles/utils';

import ArticleComment from './index';

const meta: Meta<typeof ArticleComment> = {
  title: 'Article/ArticleComment',
  component: ArticleComment,
  decorators: [
    (Story) => (
      <PageLayout css={{ paddingTop: 20 }}>
        <Story />
      </PageLayout>
    ),
  ],
  argTypes: {
    ...disableArgs(['comment, leaf']),
  },
  parameters: {
    msw: {
      handlers: {
        member: [],
        articleComment: [],
      },
    },
  },
};

export default meta;

type CommentStory = StoryObj<{ content?: string }>;

const CommentStoryComponent = (props: {
  mine?: boolean;
  isSignedIn?: boolean;
  isDeletedUserInfo?: boolean;
  content?: string;
}) => {
  const {
    mine = false,
    isSignedIn = false,
    isDeletedUserInfo,
    content = commentDetails[0].content,
  } = props;
  const setMyInfo = useSetMyInfo();

  const comment = isDeletedUserInfo
    ? commentDetailWithDeletedAuthor
    : { ...commentDetails[0], content, replies: [], mine };

  useEffect(() => {
    const myInfo = isSignedIn ? userInfo.certifiedSsafyUserInfo : null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMyInfo(myInfo);
  }, [isSignedIn, setMyInfo]);

  return <ArticleComment articleId={NaN} comment={comment} />;
};

export const NotMine: CommentStory = {
  args: { content: commentDetails[0].content },
  render: (args) => <CommentStoryComponent isSignedIn mine={false} {...args} />,
};

export const DeletedAuthor: CommentStory = {
  args: { content: commentDetails[0].content },
  render: (args) => (
    <CommentStoryComponent isDeletedUserInfo={true} {...args} />
  ),
};

export const Mine: CommentStory = {
  args: { content: commentDetails[0].content },
  render: (args) => <CommentStoryComponent isSignedIn mine {...args} />,
};

export const NotSignedIn: CommentStory = {
  args: { content: commentDetails[0].content },
  render: (args) => (
    <CommentStoryComponent isSignedIn={false} mine={false} {...args} />
  ),
};

export const MultipleComments = () => {
  const setMyInfo = useSetMyInfo();
  useEffect(() => {
    setMyInfo(userInfo.certifiedSsafyUserInfo);
  }, [setMyInfo]);

  return (
    <div css={flex('', '', 'column', 12)}>
      {commentDetails.map((comment) => {
        return (
          <ArticleComment
            articleId={1}
            comment={comment}
            key={comment.commentId}
          />
        );
      })}
    </div>
  );
};
