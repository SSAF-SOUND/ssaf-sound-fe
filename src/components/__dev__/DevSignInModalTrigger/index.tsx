import { css } from '@emotion/react';

import DevSignInModal from '~/components/__dev__/DevSignInModal';
import { Button, Modal } from '~/components/Common';
import { fontCss } from '~/styles/utils';
import { isDevMode } from '~/utils';

export const DevSignInModalTrigger = () => {
  if (!isDevMode) return null;

  return (
    <Modal
      onPointerDownOutside={(e) => e.preventDefault()}
      trigger={
        <Button size="sm" theme="success" css={triggerCss}>
          DEV
        </Button>
      }
      content={<DevSignInModal />}
    />
  );
};

const triggerCss = css({ width: 40 }, fontCss.style.B12);
