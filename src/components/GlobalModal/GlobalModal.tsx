import { useAtomValue, useSetAtom } from 'jotai';

import { Modal } from '~/components/Common/Modal';

import { modalAtoms } from './atoms';
import { modals } from './modals';

export const GlobalModal = () => {
  const isOpen = useAtomValue(modalAtoms.isOpen);
  const modalId = useAtomValue(modalAtoms.modalId);
  const modalProps = useAtomValue(modalAtoms.modalProps);
  const onPointerDownOutside = useAtomValue(modalAtoms.onPointerDownOutside);
  const onEscapeKeyDown = useAtomValue(modalAtoms.onEscapeKeyDown);
  const closeModal = useSetAtom(modalAtoms.closeModal);
  const modalOverlayTheme = useAtomValue(modalAtoms.modalOverlayTheme);

  if (!modalId) return <></>;

  const ModalContent = modals[modalId];

  return (
    <Modal
      open={isOpen}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      content={<ModalContent {...modalProps} />}
      onPointerDownOutside={onPointerDownOutside || closeModal}
      onEscapeKeyDown={onEscapeKeyDown || closeModal}
      overlayTheme={modalOverlayTheme}
    />
  );
};
