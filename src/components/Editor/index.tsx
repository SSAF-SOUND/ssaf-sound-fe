import dynamic from 'next/dynamic';
import Image from 'next/image';

import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { Icon, IconButton } from '~/components/Common';
import { fontCss, palettes } from '~/styles/utils';


const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading</p>,
});

interface EditorProps {}

const Editor = (props: EditorProps) => {
  const [value, setValue] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  const handleClickImageUpload = useCallback(() => {},[])

  const toolbar = useMemo(() => {
    return {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
      handlers: {
        image: handleClickImageUpload,
      },
    };
  }, [handleClickImageUpload]);

  const formats = useMemo(
    () => ['header', 'bold', 'underline', 'ordered', 'bullet', 'link'],
    []
  );

  return (
    <div css={selfCss}>
      <ReactQuill
        css={{
          fontFamily: `${fontCss.family.auto.fontFamily} !important`,
        }}
        modules={{
          toolbar,
        }}
        value={value}
        onChange={setValue}
        placeholder={'placeholder'}
        formats={formats}
      />
      <div>
        <div>
          {thumbnails.map((thumbnail) => {
            return (
              <Image
                key={thumbnail}
                src={thumbnail}
                alt=""
                width={400}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            );
          })}
        </div>
        <div css={thumbnailBarCss}></div>
        <div css={bottomToolbarCss}>
          <IconButton type="button" size={28} theme="black">
            <Icon name="image" label="사진 첨부" size={18} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Editor;

const editorContainerSelector = '.ql-container';
const editorSelector = '.ql-editor';
const editorBorder = '0.571429px rgb(204, 204, 204) solid';

const selfCss = css({
  backgroundColor: palettes.white,
  color: 'black',
  [`& ${editorContainerSelector}`]: {
    borderBottom: 0,
  },
  [`& ${editorSelector}`]: {
    fontFamily: fontCss.family.auto.fontFamily,
    height: 300,
    '::before': {
      // placeholder 스타일
      fontStyle: 'normal',
    },
  },
  '& strong': {
    fontWeight: 700,
  },
});

const thumbnailBarCss = css({});

const bottomToolbarCss = css({
  padding: 8,
  border: editorBorder,
});
