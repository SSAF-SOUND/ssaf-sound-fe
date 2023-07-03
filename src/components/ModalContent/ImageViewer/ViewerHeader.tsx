import { css } from '@emotion/react';

import { Icon, IconButton, Modal } from '~/components/Common';
import { flex, palettes } from '~/styles/utils';

export interface ViewerHeaderProps {
  onClickClose?: () => void;
}

const ViewerHeader = (props: ViewerHeaderProps) => {
  const { onClickClose } = props;
  return (
    <div css={selfCss}>
      <Modal.Close asChild>
        <IconButton size={34} onClick={onClickClose}>
          <Icon name="close" size={28} />
        </IconButton>
      </Modal.Close>
    </div>
  );
};

export default ViewerHeader;

const selfCss = css(
  {
    flexGrow: 1,
    padding: '0 15px',
    borderBottom: `1px solid ${palettes.grey1}`,
  },
  flex('center', 'flex-end', 'row')
);
