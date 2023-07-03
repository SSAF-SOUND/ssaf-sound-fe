import type { ViewerMainProps } from './ViewerMain';
import type { ViewerHeaderProps } from '~/components/ModalContent/ImageViewer/ViewerHeader';

import { css } from '@emotion/react';

import { flex, palettes } from '~/styles/utils';

import ViewerHeader from './ViewerHeader';
import ViewerMain from './ViewerMain';

interface ImageViewerProps extends ViewerHeaderProps, ViewerMainProps {}

const ImageViewer = (props: ImageViewerProps) => {
  const { src, alt, ...viewerHeaderProps } = props;

  return (
    <div css={selfCss}>
      <ViewerHeader {...viewerHeaderProps} />
      <ViewerMain src={src} alt={alt} />
    </div>
  );
};

export default ImageViewer;

const selfCss = css(
  {
    position: 'fixed',
    inset: 30,
    backgroundColor: palettes.grey0,
    border: `1px solid ${palettes.grey1}`,
    borderRadius: 8,
  },
  flex('', '')
);
