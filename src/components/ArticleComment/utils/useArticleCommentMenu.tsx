import type { AnyFunction } from '~/types';

import { Modal } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu } from '~/components/ModalContent';

const ArticleCommentMenuButtons = (props: OpenArticleCommentMenuParams) => {
  const { mine, onClickEdit, onClickRemoveAction, onClickReport } = props;

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
      <BottomMenu.Button onClick={onClickReport}>신고하기</BottomMenu.Button>
    </>
  );
};

interface OpenArticleCommentMenuParams {
  mine: boolean;
  onClickEdit?: AnyFunction;
  onClickRemoveAction?: AnyFunction;
  onClickReport?: AnyFunction;
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
