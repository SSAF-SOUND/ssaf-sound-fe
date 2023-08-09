import { isClient } from './misc';

export const scrollUpBy = (amount: number) => {
  if (isClient) {
    window.scroll({
      top: window.scrollY - amount,
    });
  }
};
