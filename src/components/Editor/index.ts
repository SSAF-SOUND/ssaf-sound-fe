import EditorCore from './Editor';
import ThumbnailBar from './ThumbnailBar';
import TitleInput from './TitleInput';

const Editor = Object.assign(EditorCore, {
  ThumbnailBar,
  TitleInput,
});

export default Editor;
export * from './Editor';
