import type { ReportProps } from '~/components/ModalContent';
import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';
import type { AnyFunction } from '~/types';

import { Modal } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu, Report } from '~/components/ModalContent';
import { ReportDomain } from '~/services/report';

const ArticleCommentMenuButtons = (props: OpenArticleCommentMenuParams) => {
  const {
    comment,
    isRecruitComment,
    onClickEdit,
    onClickRemoveAction,
    onClickReportAction,
  } = props;

  const { mine } = comment;

  return mine ? (
    <>
      <BottomMenu.Button onClick={onClickEdit}>수정하기</BottomMenu.Button>
      <Modal
        trigger={<BottomMenu.Button>삭제하기</BottomMenu.Button>}
        content={
          <Alert
            title="알림"
            description="댓글을 삭제합니다"
            actionText="삭제"
            cancelText="취소"
            onClickAction={onClickRemoveAction}
          />
        }
      />
    </>
  ) : (
    <>
      <Modal
        content={
          <Report
            domain={
              isRecruitComment
                ? ReportDomain.RECRUIT_COMMENT
                : ReportDomain.ARTICLE_COMMENT
            }
            onClickReport={onClickReportAction}
          />
        }
        trigger={<BottomMenu.Button>신고하기</BottomMenu.Button>}
      />
    </>
  );
};

interface OpenArticleCommentMenuParams {
  onClickEdit?: AnyFunction;
  onClickRemoveAction?: AnyFunction;
  onClickReportAction: ReportProps['onClickReport'];
  comment: CommentDetail | CommentDetailWithoutReplies;
  isRecruitComment: boolean;
}

export const useArticleCommentMenu = () => {
  const { openModal, closeModal } = useModal();

  const openArticleCommentMenu = (params: OpenArticleCommentMenuParams) => {
    openModal(
      'bottomMenu',
      {
        title: '댓글 메뉴',
        onClickDefaultCloseButton: closeModal,
        buttonElements: <ArticleCommentMenuButtons {...params} />,
      },
      {
        onPointerDownOutside: closeModal,
        onEscapeKeyDown: closeModal,
      }
    );
  };

  return { openArticleCommentMenu, closeArticleCommentMenu: closeModal };
};
