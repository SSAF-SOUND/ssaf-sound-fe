/** https://github.com/ZeeCoder/use-resize-observer/issues/40#issuecomment-1540994404 */

import ResizeObserver from 'resize-observer-polyfill';

export const createMockResizeObserver = () => {
  global.ResizeObserver = ResizeObserver;
};
