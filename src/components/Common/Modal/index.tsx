import type { CSSProperties, ReactElement } from 'react';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

import { colorMix, palettes } from '~/styles/utils';

interface ModalProps {
  open?: boolean;
  trigger?: ReactElement;
  content: ReactElement;
  withOverlay?: boolean;
  overlayStyle?: CSSProperties;
}

const Modal = (props: ModalProps) => {
  const {
    open,
    trigger,
    content,
    withOverlay = true,
    overlayStyle = {},
  } = props;

  return (
    <Dialog.Root open={open}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        {withOverlay && (
          <Dialog.Overlay css={overlayCss} style={overlayStyle} />
        )}
        <Dialog.Content asChild>{content}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

const overlayBaseCss = css({ position: 'fixed', inset: 0 });
const overlayCss = css([
  overlayBaseCss,
  { backgroundColor: colorMix('50%', palettes.black) },
]);
