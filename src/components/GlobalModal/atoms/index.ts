import type { modals } from '../modals';
import type { ComponentProps } from 'react';
import type Modal from '~/components/Common/Modal';

import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';

// modal open & close
const isOpenAtom = atom(false);
const openModalAtom = atom(null, (_, set) => {
  set(isOpenAtom, true);
});
const closeModalAtom = atom(null, (_, set) => {
  set(isOpenAtom, false);
});
const onEscapeKeyDownAtom =
  atom<ComponentProps<typeof Modal>['onEscapeKeyDown']>(undefined);
const onPointerDownOutsideAtom =
  atom<ComponentProps<typeof Modal>['onPointerDownOutside']>(undefined);

// modal contents
const modalIdAtom = atom<keyof typeof modals | undefined>(undefined);
const modalPropsAtom = atom<
  ComponentProps<(typeof modals)[keyof typeof modals]>
>({});
const resetModalAtom = atom(null, (_, set) => {
  set(modalIdAtom, undefined);
  set(modalPropsAtom, {});
  set(isOpenAtom, false);
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
};
