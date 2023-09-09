import type { ArticleCommentFormProps } from '~/components/Forms/ArticleCommentForm';

import { useState } from 'react';

import { useModal } from '~/components/GlobalModal';

interface OpenArticleCommentModalFormParams {
  onValidSubmit: ArticleCommentFormProps['onValidSubmit'];
  defaultValues?: ArticleCommentFormProps['defaultValues'];
  isRecruitComment?: boolean;
}

export const useArticleCommentModalForm = () => {
  const { openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
    closeModal();
  };

  const handleOpenModal = (params: OpenArticleCommentModalFormParams) => {
    setIsOpen(true);
    openModal('articleCommentForm', params, {
      onPointerDownOutside: reconfirmModalClose,
      onEscapeKeyDown: reconfirmModalClose,
      overlayTheme: 'lightBlack',
    });
  };

  const reconfirmModalClose = () => {
    if (window.confirm('작성중인 댓글이 지워집니다.')) {
      handleCloseModal();
    }
  };

  return {
    openArticleCommentModalForm: handleOpenModal,
    closeArticleCommentModalForm: handleCloseModal,
    isOpen,
  };
};
