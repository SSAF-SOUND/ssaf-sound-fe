import type { modals } from './modals';
import type { ComponentProps } from 'react';
import type { ModalCoreProps } from '~/components/Common/Modal/Core';

import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { modalAtoms } from './atoms';

interface OpenModalOptions {
  onEscapeKeyDown: ModalCoreProps['onEscapeKeyDown'];
  onPointerDownOutside: ModalCoreProps['onPointerDownOutside'];
  overlayTheme: ModalCoreProps['overlayTheme'];
}

export const useModal = () => {
  const __openModal = useSetAtom(modalAtoms.openModal);
  const __closeModal = useSetAtom(modalAtoms.closeModal);
  const __resetModal = useSetAtom(modalAtoms.resetModal);
  const __setOnEscapeKeyDown = useSetAtom(modalAtoms.onEscapeKeyDown);
  const __setOnPointerDownOutside = useSetAtom(modalAtoms.onPointerDownOutside);

  const __setModalId = useSetAtom(modalAtoms.modalId);
  const __setModalProps = useSetAtom(modalAtoms.modalProps);
  const __setModalOverlayStyle = useSetAtom(modalAtoms.modalOverlayTheme);

  const openModal = useCallback(
    <T extends keyof typeof modals>(
      id: T,
      modalProps: ComponentProps<(typeof modals)[T]>,
      options: Partial<OpenModalOptions> = {}
    ) => {
      const { onEscapeKeyDown, onPointerDownOutside, overlayTheme } = options;
      __setOnEscapeKeyDown(() => onEscapeKeyDown);
      __setOnPointerDownOutside(() => onPointerDownOutside);
      __setModalId(id);
      __setModalProps(modalProps);
      __setModalOverlayStyle(overlayTheme);
      __openModal();
    },
    [
      __openModal,
      __setModalId,
      __setModalProps,
      __setOnEscapeKeyDown,
      __setModalOverlayStyle,
      __setOnPointerDownOutside,
    ]
  );

  const closeModal = useCallback(() => {
    __closeModal();
  }, [__closeModal]);

  const resetModal = useCallback(() => {
    __resetModal();
  }, [__resetModal]);

  return {
    openModal,
    closeModal,
    resetModal,
  };
};
