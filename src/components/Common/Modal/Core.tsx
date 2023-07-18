import type { ReactElement } from 'react';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

import { colorMix, palettes, zIndex } from '~/styles/utils';

interface ModalCoreProps {
  /**
   * - 모달이 열렸을 때 보여줄 콘텐츠
   * - `~/components/ModalContent`에 작성된 컴포넌트만 할당합니다.
   */
  content: ReactElement;
  /**
   * - `controlled`로 활용하는 경우에만 사용합니다.
   */
  open?: boolean;
  /**
   * - `uncontrolled`로 활용하는 경우에는 이 버튼으로 `open`상태를 바꿀 수 있습니다.
   */
  trigger?: ReactElement;
  /**
   * - 기본값은 `true`이고, 콘텐츠의 부모 엘리먼트가 `body`가 됩니다.
   */
  portal?: boolean;
  /**
   * - 콘텐츠 바깥을 포인팅했을 때 수행할 콜백함수입니다.
   * - `uncontrolled`에서는 `e.preventDefault()`를 사용하여 오버레이 클릭 시 모달 닫힘을 막을 수 있습니다.
   */
  onPointerDownOutside?: (
    e: CustomEvent<{
      originalEvent: PointerEvent;
    }>
  ) => void;
  /**
   * - `ESC`키 눌렀을 때 수행할 콜백함수입니다.
   * - `uncontrolled`에서는 `e.preventDefault()`를 사용하여 `ESC`키를 누를시 모달 닫힘을 막을 수 있습니다.
   */
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
}

const ModalCore = (props: ModalCoreProps) => {
  const {
    content,
    open,
    trigger,
    portal = true,
    onPointerDownOutside,
    onEscapeKeyDown,
  } = props;

  return (
    <Dialog.Root open={open}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      {portal ? (
        <Dialog.Portal>
          <Dialog.Overlay css={[overlayCss, overlayColorCss.black]} />
          <Dialog.Content
            css={contentCss}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
          >
            {content}
          </Dialog.Content>
        </Dialog.Portal>
      ) : (
        <>
          <Dialog.Overlay css={[overlayCss, overlayColorCss.black]} />
          <Dialog.Content
            css={contentCss}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
          >
            {content}
          </Dialog.Content>
        </>
      )}
    </Dialog.Root>
  );
};

export default ModalCore;

const overlayCss = css({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.fixed.modalOverlay,
});

const overlayColorCss = {
  black: css({ backgroundColor: colorMix('50%', palettes.black) }),
  // 추가할 오버레이 색상이 있다면, 여기에 추가하고 prop 으로 분기처리 하거나,
  // overlayStyle prop 만들어서 스타일 덮어쓸 생각입니다.
};

const contentCss = css({
  position: 'relative',
  zIndex: zIndex.fixed.modalContent,
});
