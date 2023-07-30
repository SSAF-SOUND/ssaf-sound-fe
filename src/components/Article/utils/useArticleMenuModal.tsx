import type { ArticleDetail } from '~/services/article';

import { useRouter } from 'next/router';

import { Modal } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu } from '~/components/ModalContent';
import { useRemoveArticle } from '~/services/article';
import { handleAxiosError, routes } from '~/utils';

interface UseArticleMenuModalParams {
  articleDetail: ArticleDetail;
}

export const useArticleMenuModal = (params: UseArticleMenuModalParams) => {
  const { openModal, closeModal } = useModal();
  const { articleDetail } = params;
  const { mine } = articleDetail;

  const handleClickModifyButton = () => {};

  const openArticleMenuModal = () => {
    openModal('bottomMenu', {
      title: '게시글 메뉴',
      buttonElements: mine ? (
        <>
          <BottomMenu.Button>수정하기</BottomMenu.Button>
          <ArticleRemoveButton
            articleDetail={articleDetail}
            onRemoveSuccess={closeModal}
          />
        </>
      ) : (
        <ArticleReportButton
          articleDetail={articleDetail}
          onReportSuccess={closeModal}
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
  const router = useRouter();
  const { articleDetail, onRemoveSuccess } = props;
  const {
    postId: articleId,
    category: { boardId: categoryId },
  } = articleDetail;

  const { mutateAsync: removeArticle, isLoading: isRemovingArticle } =
    useRemoveArticle();

  const handleRemoveArticle = async () => {
    try {
      await removeArticle({ articleId });
      onRemoveSuccess();
      router.push(routes.articles.category(categoryId));
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

  const handleReportArticle = () => {};

  /**
   * TODO
   *   신고 Modal Content 만들기
   */

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
      trigger={<BottomMenu.Button>신고하기</BottomMenu.Button>}
    />
  );
};
