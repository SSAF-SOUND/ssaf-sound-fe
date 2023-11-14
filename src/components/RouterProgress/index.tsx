import NextNProgress from 'nextjs-progressbar';

import { palettes, zIndex } from '~/styles/utils';

const parentStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  zIndex: zIndex.fixed.max,
  pointerEvents: 'none',
} as const;

const parentId = 'ssaf-sound-progress';
const progressBarHeight = 4;

const RouterProgress = () => {
  return (
    <>
      <NextNProgress
        color={palettes.warning.dark}
        height={progressBarHeight}
        options={{ showSpinner: false, parent: `#${parentId}` }}
      />
      <div id={parentId} style={parentStyle} />
    </>
  );
};

export default RouterProgress;
