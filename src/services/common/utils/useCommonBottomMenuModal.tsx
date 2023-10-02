import type { ReportProps } from '~/components/ModalContent';
import type { ReportDomain } from '~/services/report';

import { Modal } from '~/components/Common/Modal';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu, Report } from '~/components/ModalContent';
import { useAsyncState } from '~/hooks';

interface UseCommonBottomMenuModalOptions {
  modalTitle: string;
  removeAlertDescription: string;
  disableEdit: boolean;
}

export interface UseCommonBottomMenuModalParams {
  mine: boolean;
  reportDomain: ReportDomain;
  onClickRemove: () => void;
  onClickReport: ReportProps['onClickReport'];
  onClickEdit: () => void;
  options?: Partial<UseCommonBottomMenuModalOptions>;
}

export const useCommonBottomMenuModal = (
  params: UseCommonBottomMenuModalParams
) => {
  const {
    mine,
    reportDomain,
    onClickRemove,
    onClickReport,
    onClickEdit,
    options: { modalTitle = '메뉴', removeAlertDescription, disableEdit } = {},
  } = params;
  const { openModal, closeModal } = useModal();

  const openCommonBottomMenuModal = () => {
    openModal('bottomMenu', {
      title: modalTitle,
      buttonElements: mine ? (
        <MineBottomMenuButtons
          disableEdit={disableEdit}
          removeAlertDescription={removeAlertDescription}
          onClickRemove={onClickRemove}
          onClickEdit={onClickEdit}
        />
      ) : (
        <NotMineBottomMenuButtons
          reportDomain={reportDomain}
          onClickReport={onClickReport}
        />
      ),
      onClickDefaultCloseButton: closeModal,
    });
  };
  const closeCommonBottomMenuModal = closeModal;

  return {
    openCommonBottomMenuModal,
    closeCommonBottomMenuModal,
  };
};

interface MineBottomMenuButtonsProps
  extends Pick<
    UseCommonBottomMenuModalParams,
    'onClickRemove' | 'onClickEdit'
  > {
  removeAlertDescription?: string;
  disableEdit?: boolean;
}
const MineBottomMenuButtons = (props: MineBottomMenuButtonsProps) => {
  const { removeAlertDescription, disableEdit, onClickRemove, onClickEdit } =
    props;
  const { handleAsync: handleClickRemove, loading: isRemoving } =
    useAsyncState(onClickRemove);

  const handleClickEdit = () => {
    onClickEdit();
  };

  return (
    <>
      {!disableEdit && (
        <BottomMenu.Button onClick={handleClickEdit}>
          수정하기
        </BottomMenu.Button>
      )}
      <Modal
        trigger={
          <BottomMenu.Button loading={isRemoving}>삭제하기</BottomMenu.Button>
        }
        content={
          <Alert
            title="알림"
            description={removeAlertDescription}
            actionText="삭제"
            cancelText="취소"
            onClickAction={handleClickRemove}
          />
        }
      />
    </>
  );
};

interface NotMineBottomMenuButtonsProps
  extends Pick<
    UseCommonBottomMenuModalParams,
    'onClickReport' | 'reportDomain'
  > {}
const NotMineBottomMenuButtons = (props: NotMineBottomMenuButtonsProps) => {
  const { onClickReport, reportDomain } = props;
  const { handleAsync: handleClickReport, loading: isReporting } =
    useAsyncState(onClickReport);

  return (
    <Modal
      trigger={
        <BottomMenu.Button loading={isReporting}>신고하기</BottomMenu.Button>
      }
      content={
        <Report domain={reportDomain} onClickReport={handleClickReport} />
      }
    />
  );
};
