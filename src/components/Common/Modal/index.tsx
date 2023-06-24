import * as Dialog from '@radix-ui/react-dialog';

import ModalCore from './Core';

const Modal = Object.assign(ModalCore, {
  Close: Dialog.Close,
  Title: Dialog.Title,
  Description: Dialog.Description,
});

export default Modal;
