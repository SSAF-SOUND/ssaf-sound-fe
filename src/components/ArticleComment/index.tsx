import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';
import type { UseCommonBottomMenuModalParams } from '~/services/common';

import { css } from '@emotion/react';
import { memo } from 'react';

import CommentContent from '~/components/ArticleComment/CommentContent';
import CommentDateTime from '~/components/ArticleComment/CommentDateTime';
import LikeLayer from '~/components/ArticleComment/LikeLayer';
import MoreButton from '~/components/ArticleComment/MoreButton';
import ReplyButton from '~/components/ArticleComment/ReplyButton';
import { Icon } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import Name from '~/components/Name';
import {
  useInvalidateComments,
  useRemoveComment,
  useReplyComment,
  useUpdateComment,
} from '~/services/comment';
import { useCommonBottomMenuModal } from '~/services/common';
import { useMyInfo } from '~/services/member';
import { populateDefaultUserInfo } from '~/services/member/utils/popoulateDefaultUserInfo';
import { ReportDomain, useReport } from '~/services/report';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';
import { customToast, handleAxiosError } from '~/utils';

import { useArticleCommentModalForm } from './utils';

interface ArticleCommentProps {
  articleId: number;
  comment: CommentDetail | CommentDetailWithoutReplies;
  leaf?: boolean;
  isRecruitComment?: boolean;
}

const ArticleComment = memo((props: ArticleCommentProps) => {
  const { articleId, comment, leaf = false, isRecruitComment = false } = props;
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: reportComment, isLoading: isReportingComment } =
    useReport();
  const { closeModal } = useModal();
  const {
    isOpen: isArticleCommentModalFormOpen,
    openArticleCommentModalForm,
    closeArticleCommentModalForm,
  } = useArticleCommentModalForm();

  const {
    author,
    commentId,
    anonymity = false,
    liked,
    likeCount,
    content,
    createdAt,
    replies,
    modified,
    deletedComment,
    mine,
  } = comment;

  const invalidateComments = useInvalidateComments(articleId, {
    recruit: isRecruitComment,
  });

  const { mutateAsync: replyComment } = useReplyComment(
    { commentId, articleId },
    { recruit: isRecruitComment }
  );

  const { mutateAsync: updateComment, isLoading: isUpdatingComment } =
    useUpdateComment(commentId, { recruit: isRecruitComment });

  const { mutateAsync: removeComment, isLoading: isRemovingComment } =
    useRemoveComment(commentId, { recruit: isRecruitComment });

  const isMutating =
    isUpdatingComment || isRemovingComment || isReportingComment;

  const onClickReplyButton = () => {
    openArticleCommentModalForm({
      onValidSubmit: async (_, formValues) => {
        try {
          await replyComment(formValues);
          closeArticleCommentModalForm();
          invalidateComments();
        } catch (err) {
          handleAxiosError(err);
        }
      },
      isRecruitComment,
    });
  };

  const onClickEdit = () => {
    openArticleCommentModalForm({
      defaultValues: { content, anonymous: anonymity },
      onValidSubmit: async (_, formValues) => {
        try {
          await customToast.promise(updateComment(formValues), {
            loading: '댓글을 수정중입니다.',
            success: '댓글을 성공적으로 수정했습니다.',
          });
          invalidateComments();
          closeArticleCommentModalForm();
        } catch (err) {}
      },
      isRecruitComment,
    });
  };

  const onClickRemove = async () => {
    try {
      await customToast.promise(removeComment(), {
        loading: '댓글을 삭제중입니다.',
        success: '댓글을 성공적으로 삭제하였습니다.',
      });
      invalidateComments();
      closeModal();
    } catch (err) {}
  };

  const onClickReport: UseCommonBottomMenuModalParams['onClickReport'] = ({
    domain,
    reportReasonId,
  }) => {
    return customToast.promise(
      reportComment({
        domain,
        reasonId: reportReasonId,
        sourceId: commentId,
      }),
      {
        loading: '신고 요청을 처리중입니다.',
        success: '해당 댓글을 성공적으로 신고하였습니다.',
      }
    );
  };

  const { openCommonBottomMenuModal } = useCommonBottomMenuModal({
    mine,
    reportDomain: isRecruitComment
      ? ReportDomain.RECRUIT_COMMENT
      : ReportDomain.ARTICLE_COMMENT,
    onClickEdit,
    onClickRemove,
    onClickReport,
    options: {
      modalTitle: '댓글 메뉴',
      removeAlertDescription: '댓글을 삭제하시겠습니까?',
    },
  });

  const isSignedIn = !!myInfo;
  const userInfo = populateDefaultUserInfo(author);
  const hasReplies = replies && replies.length > 0;
  const showReplyButton = isSignedIn && !leaf;

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
              <Name anonymous={anonymity} userInfo={userInfo} size="sm" />

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
                  isRecruitComment={isRecruitComment}
                />
                {isSignedIn && (
                  <MoreButton
                    onClick={openCommonBottomMenuModal}
                    loading={isMutating}
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
              <Icon name="reply" size={24} label="대댓글" />
              <ArticleComment
                articleId={articleId}
                leaf
                comment={reply}
                isRecruitComment={isRecruitComment}
              />
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
  background: colorMix('30%', palettes.primary.default),
});

const deletedCommentCss = css(fontCss.style.R14);
