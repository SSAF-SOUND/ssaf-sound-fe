import ResizeObserver from 'resize-observer-polyfill';

export const createMockResizeObserver = () => {
  global.ResizeObserver = ResizeObserver;
};
