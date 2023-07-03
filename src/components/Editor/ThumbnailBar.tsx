import { css } from '@emotion/react';
import { memo, useState } from 'react';

import { Icon, IconButton, Modal } from '~/components/Common';
import Thumbnail from '~/components/Editor/Thumbnail';
import { ImageViewer } from '~/components/ModalContent';
import { flex } from '~/styles/utils';

interface ThumbnailBarProps {
  thumbnails: string[];
}

const ThumbnailBar = (props: ThumbnailBarProps) => {
  const { thumbnails } = props;
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastIndex = thumbnails.length - 1;
  const hasThumbnail = !!thumbnails.length;

  return (
    <>
      <ol css={selfCss}>
        {thumbnails.map((thumbnail, index) => (
          <Thumbnail
            key={thumbnail}
            src={thumbnail}
            alt=""
            size={70}
            onClickThumbnail={() => {
              openModal();
              setSelectedIndex(index);
            }}
            onClickRemove={() => console.log('remove clicked')}
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
              src={thumbnails[selectedIndex]}
              onClickClose={closeModal}
              controlButtons={
                <div css={controlButtonsCss}>
                  <IconButton
                    size={34}
                    onClick={() => setSelectedIndex((p) => p - 1)}
                    disabled={selectedIndex === 0}
                  >
                    <Icon
                      size={34}
                      name="chevron.down"
                      label="이전 썸네일"
                      style={{ transform: 'rotate(90deg)' }}
                    />
                  </IconButton>
                  <IconButton
                    size={34}
                    onClick={() => setSelectedIndex((p) => p + 1)}
                    disabled={selectedIndex === lastIndex}
                  >
                    <Icon
                      size={34}
                      name="chevron.down"
                      label="다음 썸네일"
                      style={{ transform: 'rotate(-90deg)' }}
                    />
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
    width: '100%',
    padding: 10,
  },
  flex('', '', 'row', 10, 'wrap')
);

const controlButtonsCss = css(flex('', '', 'row', 10));
