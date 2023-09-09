import type { ReportProps } from '~/components/ModalContent';
import type { RecruitDetail } from '~/services/recruit';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import toast from 'react-hot-toast';

import Name from '~/components/Name';
import { RecruitIconButton } from '~/components/Recruit/Recruit/RecruitIconButton';
import { RecruitTitle } from '~/components/Recruit/Recruit/RecruitTitle';
import { RecruitViewCount } from '~/components/Recruit/Recruit/RecruitViewCount';
import { RecruitDeadline } from '~/components/Recruit/RecruitDeadline';
import { useCommonBottomMenuModal } from '~/services/common';
import { useMyInfo } from '~/services/member';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { ReportDomain, useReport } from '~/services/report';
import { flex } from '~/styles/utils';
import { customToast, routes } from '~/utils';

interface RecruitHeaderProps {
  className?: string;
  recruitDetail: RecruitDetail;
}

export const RecruitHeader = (props: RecruitHeaderProps) => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const { recruitDetail, ...restProps } = props;
  const { recruitId, category, recruitEnd, view, title, author, mine } =
    recruitDetail;
  const { mutateAsync: reportRecruit } = useReport();

  const recruitTheme = getRecruitThemeByCategory(category);

  const onClickEdit = () => router.push(routes.recruit.edit(recruitId));
  const onClickRemove = () => {};
  const onClickReport: ReportProps['onClickReport'] = ({
    domain,
    reportReasonId,
  }) => {
    return customToast.promise(
      reportRecruit({
        domain,
        reasonId: reportReasonId,
        sourceId: recruitId,
      }),
      {
        loading: '신고 요청을 처리중입니다.',
        success: '해당 리쿠르팅을 성공적으로 신고하였습니다.',
      }
    );
  };

  const { openCommonBottomMenuModal } = useCommonBottomMenuModal({
    mine,
    reportDomain: ReportDomain.RECRUIT,
    onClickEdit,
    onClickRemove,
    onClickReport,
    options: {
      modalTitle: '리쿠르팅 메뉴',
      removeAlertDescription: '리쿠르팅을 삭제하시겠습니까?',
    },
  });

  return (
    <header css={[selfCss, { marginBottom: 20 }]} {...restProps}>
      <RecruitDeadline endDate={recruitEnd} size="md" theme={recruitTheme} />

      <RecruitViewCount>{view.toLocaleString()}</RecruitViewCount>

      <div css={titleLayerCss}>
        <RecruitTitle>{title}</RecruitTitle>
        {isSignedIn && (
          <RecruitIconButton
            iconName="more"
            label="더보기"
            onClick={openCommonBottomMenuModal}
          />
        )}
      </div>

      <Name userInfo={author} size="md" />
    </header>
  );
};

const selfCss = css(flex('flex-start', '', 'column'));

const titleLayerCss = css(
  { width: '100%' },
  flex('center', 'space-between', 'row', 12)
);
