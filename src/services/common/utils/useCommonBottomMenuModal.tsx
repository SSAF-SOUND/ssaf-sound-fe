import type { ReportProps } from '~/components/ModalContent';
import type { ReportDomain } from '~/services/report';

import { Modal } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { Alert, BottomMenu, Report } from '~/components/ModalContent';

interface UseCommonBottomMenuModalOptions {
  modalTitle: string;
  removeAlertDescription: string;
}

interface UseCommonBottomMenuModalParams {
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
    options: { modalTitle = '메뉴', removeAlertDescription } = {},
  } = params;
  const { openModal, closeModal } = useModal();

  const openCommonBottomMenuModal = () => {
    openModal('bottomMenu', {
      title: modalTitle,
      buttonElements: mine ? (
        <MineBottomMenuButtons
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
}
const MineBottomMenuButtons = (props: MineBottomMenuButtonsProps) => {
  const { removeAlertDescription, onClickRemove, onClickEdit } = props;

  const { closeModal } = useModal();
  const handleClickEdit = () => {
    onClickEdit();
    closeModal();
  };

  return (
    <>
      <BottomMenu.Button onClick={handleClickEdit}>수정하기</BottomMenu.Button>
      <Modal
        trigger={<BottomMenu.Button>삭제하기</BottomMenu.Button>}
        content={
          <Alert
            title="알림"
            description={removeAlertDescription}
            actionText="삭제"
            cancelText="취소"
            onClickAction={onClickRemove}
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

  return (
    <Modal
      trigger={<BottomMenu.Button>신고하기</BottomMenu.Button>}
      content={<Report domain={reportDomain} onClickReport={onClickReport} />}
    />
  );
};
