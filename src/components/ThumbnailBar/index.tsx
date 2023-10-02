import type { CSSProperties } from 'react';

import dynamic from 'next/dynamic';

import { css } from '@emotion/react';
import { memo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { flex, palettes } from '~/styles/utils';

import Thumbnail from './Thumbnail';

const ImageViewer = dynamic(
  () => import('~/components/ModalContent').then((mod) => mod.ImageViewer),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);

interface ThumbnailState {
  thumbnailUrl: string;
  loading: boolean;
}

interface ThumbnailBarProps {
  className?: string;
  style?: CSSProperties;
  thumbnails: ThumbnailState[];
  onClickRemoveThumbnail?: (index: number) => void;
  disableRemove?: boolean;
  thumbnailSize?: number;
}

const ThumbnailBar = (props: ThumbnailBarProps) => {
  const {
    thumbnails,
    thumbnailSize = 100,
    onClickRemoveThumbnail,
    disableRemove,
    ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastIndex = thumbnails.length - 1;
  const hasThumbnail = !!thumbnails.length;

  return (
    <>
      <ol css={selfCss} {...restProps}>
        {thumbnails.map(({ thumbnailUrl, loading }, index) => (
          <Thumbnail
            loading={loading}
            key={thumbnailUrl}
            src={thumbnailUrl}
            alt=""
            size={thumbnailSize}
            onClickThumbnail={() => {
              openModal();
              setSelectedIndex(index);
            }}
            onClickRemove={() => onClickRemoveThumbnail?.(index)}
            disableRemove={disableRemove}
          />
        ))}
      </ol>
      {hasThumbnail && (
        <Modal
          open={open}
          onPointerDownOutside={closeModal}
          onEscapeKeyDown={closeModal}
          content={
            <ImageViewer
              src={thumbnails[selectedIndex].thumbnailUrl}
              onClickClose={closeModal}
              controlButtons={
                <div css={controlButtonsCss}>
                  <IconButton
                    size={34}
                    onClick={() => setSelectedIndex((p) => p - 1)}
                    disabled={selectedIndex === 0}
                  >
                    <Icon size={34} name="chevron.left" label="이전 썸네일" />
                  </IconButton>
                  <IconButton
                    size={34}
                    onClick={() => setSelectedIndex((p) => p + 1)}
                    disabled={selectedIndex === lastIndex}
                  >
                    <Icon size={34} name="chevron.right" label="다음 썸네일" />
                  </IconButton>
                </div>
              }
            />
          }
        />
      )}
    </>
  );
};

export default memo(ThumbnailBar);

const selfCss = css(
  {
    backgroundColor: palettes.white,
    width: '100%',
    padding: 10,
  },
  flex('', '', 'row', 10, 'wrap')
);

const controlButtonsCss = css(flex('', '', 'row', 10));
