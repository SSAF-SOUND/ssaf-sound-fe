import type { modals } from '../modals';
import type { ComponentProps } from 'react';
import type { ModalCoreProps } from '~/components/Common/Modal/Core';

import { atom } from 'jotai';

// modal overlay
const modalOverlayThemeAtom = atom<ModalCoreProps['overlayTheme']>(undefined);

// modal open & close
const isOpenAtom = atom(false);
const openModalAtom = atom(null, (_, set) => {
  set(isOpenAtom, true);
});
const closeModalAtom = atom(null, (_, set) => {
  set(isOpenAtom, false);
});
const onEscapeKeyDownAtom = atom<ModalCoreProps['onEscapeKeyDown']>(undefined);
const onPointerDownOutsideAtom =
  atom<ModalCoreProps['onPointerDownOutside']>(undefined);

// modal contents
const modalIdAtom = atom<keyof typeof modals | undefined>(undefined);
const modalPropsAtom = atom<
  ComponentProps<(typeof modals)[keyof typeof modals]>
>({});

const resetModalAtom = atom(null, (_, set) => {
  set(modalIdAtom, undefined);
  set(modalPropsAtom, {});
  set(isOpenAtom, false);
  set(modalOverlayThemeAtom, undefined);
});

export const modalAtoms = {
  //
  isOpen: isOpenAtom,
  openModal: openModalAtom,
  closeModal: closeModalAtom,
  resetModal: resetModalAtom,
  onEscapeKeyDown: onEscapeKeyDownAtom,
  onPointerDownOutside: onPointerDownOutsideAtom,

  //
  modalId: modalIdAtom,
  modalProps: modalPropsAtom,
  modalOverlayTheme: modalOverlayThemeAtom,
};
