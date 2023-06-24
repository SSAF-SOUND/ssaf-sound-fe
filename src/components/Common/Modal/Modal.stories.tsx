import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import type { AnyFunction } from '~/types';

import { css } from '@emotion/react';
import { useState } from 'react';

import { Button } from '~/components/Common';
import Alert from '~/components/ModalContent/Alert';
import { flex, fontCss, palettes, position } from '~/styles/utils';

import Modal from './index';

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
    );
  },
};

export const ControlledModal: ModalStory = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const dataArr = ['A', 'B', 'C', 'D'];

    const [selectedData, setSelectedData] = useState('');

    return (
      <div css={selfCss}>
        {dataArr.map((data) => (
          <Button
            key={data}
            color="secondary"
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
    );
  },
};

export const GlobalModal: ModalStory = {
  /**
   * 이 `GlobalModal`을 `_app.tsx`에서 마운트시키고,
   * 다른곳에서 전역 상태를 변경함으로써 모달을 컨트롤합니다.
   *
   * 리덕스의 상태 값은 `plain object`만 사용하는걸 권장하기 때문에
   * `store`에 함수나 리액트 컴포넌트 같은걸 가급적 저장하지 말아야 합니다.
   *
   * 따라서, 동적으로 데이터나 핸들러가 변경되는 모달 콘텐츠는 웬만하면 로컬 모달(이전 두가지 스토리)로 구현하는게 좋습니다.
   */
  render: function GlobalModal() {
    const { modalContentId, open } = useAppSelector((state) => state.modal);
    const { openModal, closeModal } = useAppDispatch();
    const modalContent = modalContents[modalContentId];

    return (
      <>
        <p>DOCS에서 ShowCode 눌러서 코드를 봐주세요</p>
        <Modal open={open} content={modalContent} />
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

interface ModalStore {
  open: boolean;
  modalContentId: string;
}
const useAppSelector = (fn: (state: { modal: ModalStore }) => void) => {
  return {
    open: false,
    modalContentId: '1',
  };
};
const useAppDispatch = () => {
  return {
    openModal: () => {},
    closeModal: () => {},
  };
};

const modalContents: Record<string, ReactElement> = new Proxy(
  {},
  {
    get: () => <></>,
  }
);
