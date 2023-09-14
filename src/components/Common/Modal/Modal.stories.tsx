import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';
import { useState } from 'react';

import { Button } from '~/components/Common';
import { flex, fontCss, palettes, position } from '~/styles/utils';

import { Modal } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Modal/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type ModalStory = StoryObj<typeof Modal>;

export const UncontrolledModal: ModalStory = {
  render: () => {
    const dataArr = ['A', 'B', 'C', 'D'];

    return (
      <>
        <p css={{ marginBottom: 10 }}>
          DOCS에서 ShowCode 눌러서 코드를 봐주세요
        </p>
        <div css={selfCss}>
          {dataArr.map((data) => (
            <Modal
              key={data}
              trigger={<Button>Remove {data}</Button>}
              content={
                <div css={contentCss}>
                  <Modal.Title>Title: {data}를 삭제합니다.</Modal.Title>
                  <Modal.Description>Description</Modal.Description>

                  <div>
                    <Modal.Close>취소</Modal.Close>
                    <Modal.Close onClick={() => console.log(`${data} 삭제`)}>
                      삭제
                    </Modal.Close>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </>
    );
  },
};

export const ControlledModal: ModalStory = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const dataArr = ['A', 'B', 'C', 'D'];

    const [selectedData, setSelectedData] = useState('');

    return (
      <>
        <p css={{ marginBottom: 10 }}>
          DOCS에서 ShowCode 눌러서 코드를 봐주세요
        </p>
        <div css={selfCss}>
          {dataArr.map((data) => (
            <Button
              key={data}
              theme="secondary"
              onClick={() => {
                setOpen(true);
                setSelectedData(data);
              }}
            >
              Remove {data}
            </Button>
          ))}

          <Modal
            open={open}
            onEscapeKeyDown={() => setOpen(false)}
            onPointerDownOutside={() => setOpen(false)}
            content={
              <div css={contentCss}>
                <Modal.Title>Title: {selectedData}를 삭제합니다.</Modal.Title>
                <Modal.Description>Description</Modal.Description>

                <div>
                  <Modal.Close
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    취소
                  </Modal.Close>
                  <Modal.Close
                    onClick={() => {
                      setOpen(false);
                      console.log(`${selectedData} 삭제`);
                    }}
                  >
                    삭제
                  </Modal.Close>
                </div>
              </div>
            }
          />
        </div>
      </>
    );
  },
};

const selfCss = css(flex('flex-start', 'center', 'column', 10));

const contentCss = css([
  position.xy('center', 'center', 'fixed'),
  flex('center', 'center', 'column', 10),
  fontCss.family.auto,
  {
    background: 'white',
    width: 200,
    height: 200,
    color: 'black',
    '& button': {
      width: 100,
      color: palettes.primary.darken,
    },
    '& button:first-child': {
      color: palettes.error.default,
    },
  },
]);
