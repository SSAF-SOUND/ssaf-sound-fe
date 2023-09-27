import type { Theme } from '~/styles/utils';

import { css } from '@emotion/react';

import { BoldText, Button, Icon } from '~/components/Common';
import { flex } from '~/styles/utils';

interface RecruitContactLinkProps {
  className?: string;
  theme?: Theme.PRIMARY | Theme.SECONDARY;
  loading?: boolean;
  disabled?: boolean;
  href: string;
}

export const RecruitContactLink = (props: RecruitContactLinkProps) => {
  return (
    <Button css={selfCss} variant="inverse" {...props} asChild>
      <a target="_blank" rel="noopener noreferrer">
        <Icon name="chat.multiline" aria-hidden="true" />
        <BoldText>Contact</BoldText>
      </a>
    </Button>
  );
};

const selfCss = css(flex('center', 'center', 'row', 8));
