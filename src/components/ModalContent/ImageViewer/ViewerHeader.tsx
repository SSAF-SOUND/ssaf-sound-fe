import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { flex, palettes } from '~/styles/utils';

export interface ViewerHeaderProps {
  onClickClose?: () => void;
  controlButtons?: ReactNode;
}

const ViewerHeader = (props: ViewerHeaderProps) => {
  const { onClickClose, controlButtons } = props;
  const hasAdditionalButtons = !!controlButtons;

  return (
    <div css={[selfCss, hasAdditionalButtons && betweenCss]}>
      {controlButtons}

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

const betweenCss = css({
  justifyContent: 'space-between',
});
