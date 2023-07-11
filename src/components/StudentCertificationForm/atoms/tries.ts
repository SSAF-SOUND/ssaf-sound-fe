import { atom } from 'jotai';

/* constants */
const MAX_TRIES = 3;

const triesAtom = atom(0);
const maxTriesAtom = atom(() => MAX_TRIES);

export const triesAtoms = {
  tries: triesAtom,
  maxTries: maxTriesAtom,
};
