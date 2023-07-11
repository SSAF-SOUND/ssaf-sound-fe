import type { modals } from './modals';
import type { ComponentProps } from 'react';
import type { Modal } from '~/components/Common';

import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { modalAtoms } from './atoms';

interface OpenModalOptions {
  onEscapeKeyDown: ComponentProps<typeof Modal>['onEscapeKeyDown'];
  onPointerDownOutside: ComponentProps<typeof Modal>['onPointerDownOutside'];
}

export const useModal = () => {
  const __openModal = useSetAtom(modalAtoms.openModal);
  const __closeModal = useSetAtom(modalAtoms.closeModal);
  const __resetModal = useSetAtom(modalAtoms.resetModal);
  const __setModalId = useSetAtom(modalAtoms.modalId);
  const __setModalProps = useSetAtom(modalAtoms.modalProps);
  const __setOnEscapeKeyDown = useSetAtom(modalAtoms.onEscapeKeyDown);
  const __setOnPointerDownOutside = useSetAtom(modalAtoms.onPointerDownOutside);

  const openModal = useCallback(
    <T extends keyof typeof modals>(
      id: T,
      modalProps: Partial<ComponentProps<(typeof modals)[T]>>,
      options: Partial<OpenModalOptions> = {}
    ) => {
      const { onEscapeKeyDown, onPointerDownOutside } = options;
      __openModal();
      __setModalId(id);
      __setModalProps(modalProps);
      if (onEscapeKeyDown) __setOnEscapeKeyDown(onEscapeKeyDown);
      if (onPointerDownOutside) __setOnPointerDownOutside(onPointerDownOutside);
    },
    [
      __openModal,
      __setModalId,
      __setModalProps,
      __setOnEscapeKeyDown,
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
