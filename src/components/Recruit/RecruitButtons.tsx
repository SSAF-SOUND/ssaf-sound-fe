import type { RecruitCategory } from '~/services/recruit';

import { css } from '@emotion/react';

import { Button, Icon } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex } from '~/styles/utils';

interface RecruitButtonsProps {
  category?: RecruitCategory;
}

export const RecruitButtons = (props: RecruitButtonsProps) => {
  const { category = 'project' } = props;
  const theme = getRecruitThemeByCategory(category);
  return (
    <div css={selfCss}>
      <Button
        size="md"
        css={{
          width: '40%',
          height: 46,
        }}
        theme={theme}
        variant="inverse"
      >
        <Icon name="send" />
        Contact
      </Button>
      <Button
        css={{
          width: '60%',
          height: 46,
        }}
      >
        <div>리쿠르팅 신청</div>
      </Button>
    </div>
  );
};

const selfCss = css(flex('', 'space-between', 'row', 15), {
  marginBottom: 40,
});
