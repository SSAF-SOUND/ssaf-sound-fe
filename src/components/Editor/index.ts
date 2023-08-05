import EditorCore from './Editor';
import Skeleton from './EditorSkeleton';
import MessageBox from './MessageBox';
import TitleInput from './TitleInput';
import ToolBar from './ToolBar';
import ToolBarItem from './ToolBarItem';

const Editor = Object.assign(EditorCore, {
  TitleInput,
  ToolBar,
  ToolBarItem,
  Skeleton,
  MessageBox,
});

export default Editor;
export * from './Editor';
