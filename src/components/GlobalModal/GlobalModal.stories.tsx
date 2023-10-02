import type { Meta } from '@storybook/react';

import { Button } from '~/components/Common/Button';
import { Modal } from '~/components/Common/Modal';
import { Alert, BottomMenu } from '~/components/ModalContent';
import { noop } from '~/utils';

import { GlobalModal } from './GlobalModal';
import { useModal } from './useModal';

const meta: Meta<typeof GlobalModal> = {
  title: 'Modal/GlobalModal',
  component: GlobalModal,
  tags: ['autodocs'],
};

export default meta;

export const BasicExample = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = (from: number) => () => {
    openModal('alert', {
      title: 'Alert',
      description: (
        <>
          <p>{from}번 버튼에 의해 트리거된 모달</p>
          <p style={{ textAlign: 'right' }}>Right-Aligned</p>
          <p style={{ textAlign: 'center' }}>Center-Aligned</p>
          <p>Left-Aligned</p>
        </>
      ),
      actionText: 'Action',
      onClickAction: () => {
        closeModal();
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'flex-start',
        }}
      >
        {[1, 2, 3, 4, 5].map((order) => {
          return (
            <Button key={order} onClick={handleOpenModal(order)}>
              트리거 버튼 {order}
            </Button>
          );
        })}
      </div>

      {/* `GlobalModal`은 `_app.tsx`에서 한번만 렌더링합니다. */}
    </>
  );
};

export const OnlyCloseWhenActionIsPressed = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      'alert',
      {
        title: 'Alert',
        description: '바깥을 클릭하거나, ESC키로는 모달을 닫을 수 없습니다.',
        actionText: 'Action',
        onClickAction: () => {
          closeModal();
        },
      },
      {
        onEscapeKeyDown: noop,
        onPointerDownOutside: noop,
      }
    );
  };

  return (
    <>
      <Button onClick={handleOpenModal}>트리거 버튼</Button>

      {/* `GlobalModal`은 `_app.tsx`에서 한번만 렌더링합니다. */}
    </>
  );
};

export const ModalInModal = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal('bottomMenu', {
      title: 'BottomMenu',
      buttonElements: (
        <>
          <Modal
            trigger={<BottomMenu.Button>모달 열기</BottomMenu.Button>}
            content={<Alert title="Modal in Modal" actionText="Action" />}
          />
        </>
      ),
      onClickDefaultCloseButton: closeModal,
    });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'flex-start',
        }}
      >
        <Button onClick={handleOpenModal}>트리거 버튼</Button>
      </div>

      {/* `GlobalModal`은 `_app.tsx`에서 한번만 렌더링합니다. */}
    </>
  );
};
