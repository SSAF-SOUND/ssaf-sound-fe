import type { ReportProps } from '~/components/ModalContent';
import type { ArticleDetail } from '~/services/article/utils';

import { useRouter } from 'next/router';

import { Modal } from '~/components/Common/Modal';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu, Report } from '~/components/ModalContent';
import { useRemoveArticle } from '~/services/article/hooks';
import { ReportDomain, useReport } from '~/services/report';
import { customToast } from '~/utils/customToast';
import { handleAxiosError } from '~/utils/handleAxiosError';
import { routes } from '~/utils/routes';

interface UseArticleMenuModalParams {
  articleDetail: ArticleDetail;
}

export const useArticleMenuModal = (params: UseArticleMenuModalParams) => {
  const { openModal, closeModal } = useModal();
  const { articleDetail } = params;
  const { mine, postId: articleId, boardId: categoryId } = articleDetail;
  const router = useRouter();

  const onRemoveSuccess = () => {
    closeModal();
    router.push(routes.article.category(categoryId));
    customToast.success('게시글을 삭제했습니다.');
  };

  const onReportSuccess = () => {
    closeModal();
    customToast.success('게시글을 신고했습니다.');
  };

  const handleClickModifyButton = () => {
    closeModal();
    router.push(routes.article.edit(articleId));
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
    useReport();

  const handleReportArticle: ReportProps['onClickReport'] = async (params) => {
    const { reportReasonId, domain } = params;
    try {
      await reportArticle({
        domain,
        reasonId: reportReasonId,
        sourceId: articleId,
      });
      onReportSuccess();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <Modal
      content={
        <Report
          domain={ReportDomain.ARTICLE}
          onClickReport={handleReportArticle}
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
