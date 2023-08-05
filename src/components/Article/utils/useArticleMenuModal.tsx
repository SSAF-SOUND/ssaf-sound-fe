import type { ArticleDetail } from '~/services/article';

import { useRouter } from 'next/router';

import { Modal } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu } from '~/components/ModalContent';
import { useRemoveArticle, useReportArticle } from '~/services/article';
import { customToast, handleAxiosError, routes } from '~/utils';

interface UseArticleMenuModalParams {
  articleDetail: ArticleDetail;
}

export const useArticleMenuModal = (params: UseArticleMenuModalParams) => {
  const { openModal, closeModal } = useModal();
  const { articleDetail } = params;
  const {
    mine,
    category: { boardId: categoryId },
  } = articleDetail;
  const router = useRouter();

  const onRemoveSuccess = () => {
    closeModal();
    router.push(routes.articles.category(categoryId));
    customToast.success('게시글을 삭제했습니다.');
  };

  const onReportSuccess = () => {
    closeModal();
    customToast.success('게시글을 신고했습니다.');
  };

  const handleClickModifyButton = () => {
    closeModal();
    // router.push(routes.articles.edit(articleId));
  };

  const openArticleMenuModal = () => {
    openModal('bottomMenu', {
      title: '게시글 메뉴',
      buttonElements: mine ? (
        <>
          <BottomMenu.Button onClick={handleClickModifyButton}>
            수정하기
          </BottomMenu.Button>
          <ArticleRemoveButton
            articleDetail={articleDetail}
            onRemoveSuccess={onRemoveSuccess}
          />
        </>
      ) : (
        <ArticleReportButton
          articleDetail={articleDetail}
          onReportSuccess={onReportSuccess}
        />
      ),

      onClickDefaultCloseButton: closeModal,
    });
  };

  return { openArticleMenuModal };
};

interface ArticleRemoveButtonProps {
  articleDetail: ArticleDetail;
  onRemoveSuccess: () => void;
}

const ArticleRemoveButton = (props: ArticleRemoveButtonProps) => {
  const { articleDetail, onRemoveSuccess } = props;
  const { postId: articleId } = articleDetail;

  const { mutateAsync: removeArticle, isLoading: isRemovingArticle } =
    useRemoveArticle();

  const handleRemoveArticle = async () => {
    try {
      await removeArticle({ articleId });
      onRemoveSuccess();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <Modal
      content={
        <Alert
          title="알림"
          description="게시글을 삭제하시겠습니까?"
          cancelText="취소"
          actionText="삭제"
          onClickAction={handleRemoveArticle}
        />
      }
      trigger={
        <BottomMenu.Button loading={isRemovingArticle}>
          삭제하기
        </BottomMenu.Button>
      }
    />
  );
};

interface ArticleReportButtonProps {
  articleDetail: ArticleDetail;
  onReportSuccess: () => void;
}

const ArticleReportButton = (props: ArticleReportButtonProps) => {
  const { articleDetail, onReportSuccess } = props;
  const { postId: articleId } = articleDetail;
  const { mutateAsync: reportArticle, isLoading: isReportingArticle } =
    useReportArticle();

  const handleReportArticle = async () => {
    try {
      // TODO: 신고 사유를 SelectBox에서 선택할 수 있음
      await reportArticle({ articleId, content: '' });
      onReportSuccess();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // TODO: 신고 Modal Content 만들기

  return (
    <Modal
      content={
        <Alert
          title="알림"
          description="게시글을 신고하시겠습니까?"
          cancelText="취소"
          actionText="삭제"
          onClickAction={handleReportArticle}
        />
      }
      trigger={
        <BottomMenu.Button loading={isReportingArticle}>
          신고하기
        </BottomMenu.Button>
      }
    />
  );
};
