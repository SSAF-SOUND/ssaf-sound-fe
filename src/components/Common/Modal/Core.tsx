import type { ReactElement } from 'react';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

import { colorMix, palettes } from '~/styles/utils';

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
   * - `uncontrolled`로 활용하는 경우에만 사용합니다.
   * - 모달을 열기 위한 버튼 컴포넌트
   */
  trigger?: ReactElement;
  /**
   * - 기본값은 `true`이고, 콘텐츠의 부모 엘리먼트가 `body`가 됩니다.
   */
  portal?: boolean;
}

const ModalCore = (props: ModalCoreProps) => {
  const { content, open, trigger, portal = true } = props;

  return (
    <Dialog.Root open={open}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      {portal ? (
        <Dialog.Portal>
          <Dialog.Overlay css={overlayCss.black} />
          <Dialog.Content asChild>{content}</Dialog.Content>
        </Dialog.Portal>
      ) : (
        <>
          <Dialog.Overlay css={overlayCss.black} />
          <Dialog.Content asChild>{content}</Dialog.Content>
        </>
      )}
    </Dialog.Root>
  );
};

export default ModalCore;

const overlayBaseCss = css({ position: 'fixed', inset: 0 });
const overlayCss = {
  black: css([
    overlayBaseCss,
    { backgroundColor: colorMix('50%', palettes.black) },
  ]),
  // 추가할 오버레이 색상이 있다면, 여기에 추가하고 prop 으로 분기처리 하거나,
  // overlayStyle prop 만들어서 스타일 덮어쓸 생각입니다.
};
