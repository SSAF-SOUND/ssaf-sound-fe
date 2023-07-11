import { atom } from 'jotai';

import { noop } from '~/utils';

interface OpenModalOptions {
  onClickAction: () => void;
}

const isOpenAtom = atom(false);
const descriptionsAtom = atom(['']);
const onClickActionAtom = atom(noop);

const openModalAtom = atom(
  null,
  (_, set, args: Partial<OpenModalOptions> = {}) => {
    const { onClickAction } = args;
    set(isOpenAtom, true);
    if (onClickAction) set(onClickActionAtom, onClickAction);
  }
);

const closeModalAtom = atom(null, (_, set) => {
  set(isOpenAtom, false);
});

export const modalAtoms = {
  isOpen: isOpenAtom,
  descriptions: descriptionsAtom,
  onClickAction: onClickActionAtom,
  openModal: openModalAtom,
  closeModal: closeModalAtom,
};
