import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';
import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';
import type { AnyFunction } from '~/types';

import { css } from '@emotion/react';
import { memo } from 'react';

import CommentContent from '~/components/ArticleComment/CommentContent';
import CommentDateTime from '~/components/ArticleComment/CommentDateTime';
import LikeLayer from '~/components/ArticleComment/LikeLayer';
import MoreButton from '~/components/ArticleComment/MoreButton';
import ReplyButton from '~/components/ArticleComment/ReplyButton';
import { Icon } from '~/components/Common';
import Name from '~/components/Name';
import {
  useInvalidateArticleComments,
  useRemoveArticleComment,
  useReplyArticleComment,
  useUpdateArticleComment,
} from '~/services/articleComment';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { flex, fontCss, palettes } from '~/styles/utils';
import { handleAxiosError } from '~/utils';

import { useArticleCommentMenu, useArticleCommentModalForm } from './utils';

interface ArticleCommentProps {
  articleId: number;
  comment: CommentDetail | CommentDetailWithoutReplies;
  leaf?: boolean;
}

const ArticleComment = memo((props: ArticleCommentProps) => {
  const { articleId, comment, leaf = false } = props;
  const { data: myInfo } = useMyInfo();
  const {
    isOpen: isArticleCommentModalFormOpen,
    openArticleCommentModalForm,
    closeArticleCommentModalForm,
  } = useArticleCommentModalForm();

  const { openArticleCommentMenu } = useArticleCommentMenu();

  const {
    author,
    commentId,
    anonymity,
    mine,
    liked,
    likeCount,
    content,
    createdAt,
    replies,
    modified,
    deletedComment,
  } = comment;

  const invalidateArticleComments = useInvalidateArticleComments(articleId);

  const { mutateAsync: replyArticleComment } = useReplyArticleComment({
    commentId,
    articleId,
  });

  const {
    mutateAsync: updateArticleComment,
    isLoading: isUpdatingArticleComment,
  } = useUpdateArticleComment(commentId);

  const {
    mutateAsync: removeArticleComment,
    isLoading: isRemovingArticleComment,
  } = useRemoveArticleComment(commentId);

  const isLoadingMoreButton =
    isUpdatingArticleComment || isRemovingArticleComment;
  const isSignedIn = !!myInfo;
  const userInfo = populateDefaultUserInfo(author);
  const hasReplies = replies && replies.length > 0;
  const showReplyButton = isSignedIn && !leaf;

  const handleCommentRequest = async (
    callback: AnyFunction,
    modalCloseBeforeCallbackInvoked = false
  ) => {
    try {
      if (modalCloseBeforeCallbackInvoked) {
        closeArticleCommentModalForm();
        await callback();
      } else {
        await callback();
        closeArticleCommentModalForm();
      }
      invalidateArticleComments();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const handleCreateCommentReply: ArticleCommentFormProps['onValidSubmit'] =
    async (_, formValues) => {
      await handleCommentRequest(() => replyArticleComment(formValues));
    };

  const handleEditComment: ArticleCommentFormProps['onValidSubmit'] = async (
    _,
    formValues
  ) => {
    await handleCommentRequest(() => updateArticleComment(formValues));
  };

  const handleRemoveComment = () => {
    handleCommentRequest(removeArticleComment, true);
  };

  const onClickReplyButton = () => {
    openArticleCommentModalForm({ onValidSubmit: handleCreateCommentReply });
  };

  const onClickMoreButton = () => {
    openArticleCommentMenu({
      mine,
      onClickEdit: () =>
        openArticleCommentModalForm({
          defaultValues: { content, anonymous: anonymity },
          onValidSubmit: handleEditComment,
        }),
      onClickRemoveAction: handleRemoveComment,
      onClickReport: () => {
        console.log('신고페이지로');
      },
    });
  };

  return (
    <div css={selfCss}>
      <div
        css={[
          commentLayerCss,
          leaf && leafCss,
          isArticleCommentModalFormOpen && selfHighLightCss,
        ]}
      >
        {deletedComment && (
          <span css={deletedCommentCss}>삭제된 댓글입니다.</span>
        )}

        {!deletedComment && (
          <>
            <header css={headerCss}>
              {/* eslint-disable-next-line */}
              {/* @ts-ignore */}
              <Name userInfo={userInfo} size="sm" />

              <div css={buttonLayerCss}>
                {showReplyButton && (
                  <ReplyButton onClick={onClickReplyButton} />
                )}
                <LikeLayer
                  liked={liked}
                  likeCount={likeCount}
                  articleId={articleId}
                  commentId={commentId}
                  isSignedIn={isSignedIn}
                />
                {isSignedIn && (
                  <MoreButton
                    onClick={onClickMoreButton}
                    loading={isLoadingMoreButton}
                  />
                )}
              </div>
            </header>

            <CommentContent
              content={content}
              modified={modified}
              css={{ marginBottom: 4 }}
            />

            <CommentDateTime createdAt={createdAt} />
          </>
        )}
      </div>

      {hasReplies && (
        <div css={replyLayerCss}>
          {replies.map((reply) => (
            <div key={reply.commentId} css={replyCss}>
              <Icon name="reply" size={24} />
              <ArticleComment articleId={articleId} leaf comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ArticleComment.displayName = 'ArticleComment';

export default ArticleComment;

const commentLayerPaddingX = 10;

const selfCss = css({ width: '100%' });

const commentLayerCss = css({
  width: '100%',
  padding: `8px ${commentLayerPaddingX}px`,
  borderRadius: 12,
});

const leafCss = css({
  backgroundColor: palettes.background.grey,
});

const headerCss = css(flex('center', 'space-between', 'row', 20));

const buttonLayerCss = css(flex('center', '', 'row', 4));

const replyLayerCss = css({ marginTop: 6 }, flex('', '', 'column', 6));

const replyCss = css(
  {
    width: '100%',
    paddingLeft: commentLayerPaddingX,
  },
  flex('flex-start', '', 'row', 6)
);

const selfHighLightCss = css({
  background: 'red',
});

const deletedCommentCss = css(fontCss.style.R14);
