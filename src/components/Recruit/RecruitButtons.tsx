import type { RecruitCategory } from '~/services/recruit';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, Icon } from '~/components/Common';
import { useMyInfo } from '~/services/member';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { routes } from '~/utils';

import { useModal } from '../GlobalModal';

interface RecruitButtonsProps {
  category?: RecruitCategory;
  recruitId: number;
}

export const RecruitButtons = (props: RecruitButtonsProps) => {
  const { category = 'project', recruitId = 1 } = props;
  const theme = getRecruitThemeByCategory(category);
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const { openModal, closeModal } = useModal();

  const handleNotSignedInUser = () => {
    openModal('alert', {
      title: '알림',
      description: '로그인이 필요한 기능입니다.',
      actionText: '확인',
      onClickAction: closeModal,
    });
  };

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
        theme={theme}
        onClick={() => {
          if (isSignedIn) router.push(routes.recruit.apply(recruitId));
          else handleNotSignedInUser();
        }}
      >
        {/* match status 관련해서 분기처리 더 해야함. */}
        <div>리쿠르팅 신청</div>
      </Button>
    </div>
  );
};

const selfCss = css(flex('', 'space-between', 'row', 15), {
  marginBottom: 40,
});
