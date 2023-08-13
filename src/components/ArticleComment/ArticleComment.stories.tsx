import type { Meta } from '@storybook/react';

import { useEffect } from 'react';

import { commentDetails } from '~/mocks/handlers/articleComment/data';
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
      },
    },
  },
};

export default meta;

const CommentStoryComponent = (props: {
  mine?: boolean;
  isSignedIn?: boolean;
}) => {
  const { mine = false, isSignedIn = false } = props;
  const setMyInfo = useSetMyInfo();

  const comment = { ...commentDetails[0], replies: [], mine };

  const myInfo = isSignedIn ? userInfo.certifiedSsafyUserInfo : null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setMyInfo(myInfo);

  return <ArticleComment articleId={1} comment={comment} />;
};

export const NotMine = () => {
  return <CommentStoryComponent isSignedIn mine={false} />;
};

export const Mine = () => {
  return <CommentStoryComponent isSignedIn mine />;
};

export const NotSignedIn = () => {
  return <CommentStoryComponent isSignedIn={false} mine={false} />;
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
