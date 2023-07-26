import EditorCore from './Editor';
import ThumbnailBar from './ThumbnailBar';
import TitleInput from './TitleInput';
import ToolBar from './ToolBar';
import ToolBarItem from './ToolBarItem';

const Editor = Object.assign(EditorCore, {
  ThumbnailBar,
  TitleInput,
  ToolBar,
  ToolBarItem,
});

export default Editor;
export * from './Editor';
