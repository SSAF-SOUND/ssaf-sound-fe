import type { UserInfo } from '~/services/member';

export type CommentAuthor =
  | {
      anonymity: false;
      author: Omit<UserInfo, 'memberId'>;
    }
  | {
      anonymity: true;
      author: Pick<UserInfo, 'nickname'>;
    };

export interface CommentDetailWithoutAuthorAndReplies {
  commentId: number;

  content: string;
  createdAt: string;
  modified: boolean;
  deletedComment: boolean;

  liked: boolean;
  likeCount: number;

  mine: boolean;
  replies: undefined;
}

export type CommentDetailWithoutReplies = CommentDetailWithoutAuthorAndReplies &
  CommentAuthor;

export type CommentDetail = Omit<CommentDetailWithoutReplies, 'replies'> & {
  replies: CommentDetailWithoutReplies[];
};
