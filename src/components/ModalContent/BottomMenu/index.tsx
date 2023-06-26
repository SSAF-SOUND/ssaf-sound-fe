import BottomMenuBase from './BottomMenuBase';
import { BottomMenuButton, BottomMenuCloseButton } from './BottomMenuButton';

const BottomMenu = Object.assign(BottomMenuBase, {
  Button: BottomMenuButton,
  CloseButton: BottomMenuCloseButton,
});

export default BottomMenu;
