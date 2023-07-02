import { css } from '@emotion/react';
import { useState } from 'react';

import { Modal } from '~/components/Common';
import Thumbnail from '~/components/Editor/Thumbnail';
import { flex } from '~/styles/utils';

interface ThumbnailBarProps {
  thumbnails: string[];
}

const ThumbnailBar = (props: ThumbnailBarProps) => {
  const { thumbnails } = props;
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
  return (
    <>
      <ol css={selfCss}>
        {thumbnails.map((thumbnail) => (
          <Thumbnail
            key={thumbnail}
            src={thumbnail}
            alt=""
            size={70}
            onClickThumbnail={openModal}
            onClickRemove={() => {
              console.log('remove clicked');
            }}
          />
        ))}
      </ol>
      <Modal
        content={<></>}
        open={open}
        onPointerDownOutside={closeModal}
        onEscapeKeyDown={closeModal}
      />
    </>
  );
};

export default ThumbnailBar;

const selfCss = css(
  {
    width: '100%',
    padding: 10,
  },
  flex('', '', 'row', 10, 'wrap')
);
